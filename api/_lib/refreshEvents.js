// Shared core of the weekly networking-events refresh.
//
// Both entry points use this: api/refresh-events.js (called by the scheduled
// cloud routine over HTTP) and scripts/refreshEvents.js (run by hand for local
// testing). They differ only in where credentials come from and how input and
// output are wired — the prune/dedup/write rules live here so the local script
// genuinely exercises what production does.
//
// Files under api/_lib are helpers, not endpoints: Vercel only treats a file as
// a serverless function if it exports a handler, so this is not routable.

const REQUIRED_FIELDS = ['name', 'startDate', 'endDate'];

/**
 * Returns an error string describing the first invalid event, or null if the
 * whole list is usable.
 */
function validateEvents(events) {
  if (!Array.isArray(events)) {
    return 'Expected an array of event objects.';
  }

  for (let i = 0; i < events.length; i += 1) {
    const missing = REQUIRED_FIELDS.filter((field) => !events[i][field]);
    if (missing.length > 0) {
      return `Event at index ${i} ("${events[i].name || 'untitled'}") is missing required field(s): ${missing.join(', ')}`;
    }
  }

  return null;
}

/**
 * Drops events that have already ended and adds any that aren't already
 * present, deduped on name + start date. Both happen in one batch so a
 * failure can't leave the collection with the old events deleted and the
 * new ones never written.
 */
async function refreshEvents(db, newEvents) {
  const eventsRef = db.collection('events');
  const snapshot = await eventsRef.get();
  const existing = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const today = new Date().toISOString().slice(0, 10);
  const stale = existing.filter((event) => event.endDate && event.endDate < today);
  const staleIds = new Set(stale.map((event) => event.id));

  const keyOf = (event) => `${event.name}__${event.startDate}`;
  const remainingKeys = new Set(
    existing.filter((event) => !staleIds.has(event.id)).map(keyOf)
  );
  const toAdd = newEvents.filter((event) => !remainingKeys.has(keyOf(event)));

  if (stale.length > 0 || toAdd.length > 0) {
    const batch = db.batch();
    stale.forEach((event) => batch.delete(eventsRef.doc(event.id)));
    toAdd.forEach((event) => batch.set(eventsRef.doc(), event));
    await batch.commit();
  }

  return { removed: stale.length, added: toAdd.length };
}

module.exports = { refreshEvents, validateEvents };
