const { getDb } = require('./_lib/firebaseAdmin');
const { refreshEvents, validateEvents } = require('./_lib/refreshEvents');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const secret = req.headers['x-refresh-secret'];
  if (!process.env.EVENTS_REFRESH_SECRET || secret !== process.env.EVENTS_REFRESH_SECRET) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { events } = req.body || {};
  const validationError = validateEvents(events);
  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  try {
    const result = await refreshEvents(getDb(), events);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in /api/refresh-events:', error);
    res.status(502).json({ error: 'Failed to refresh events' });
  }
};
