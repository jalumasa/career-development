#!/usr/bin/env node
/**
 * Weekly networking-events refresh — local/manual runner.
 *
 * Usage:
 *   node scripts/refreshEvents.js path/to/new-events.json
 *
 * The input file is a JSON array of event objects matching the shape in
 * src/data/eventSeeds.js:
 *   { name, description, category, isOnline, city, region, country,
 *     lat, lng, startDate, endDate, link }
 *
 * In production this same work runs through the scheduled cloud routine,
 * which POSTs its research to /api/refresh-events. Both paths share the
 * prune/dedup logic in api/_lib/refreshEvents.js, so what you test here is
 * what production does. Use this script to exercise the refresh by hand
 * without waiting for the schedule.
 *
 * Auth: set GOOGLE_APPLICATION_CREDENTIALS to the path of a Firebase
 * service account key (Project Settings -> Service Accounts -> Generate
 * new private key in the Firebase console). Never commit that file —
 * it's covered by .gitignore.
 */

const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { refreshEvents, validateEvents } = require('../api/_lib/refreshEvents');

function fail(message) {
  console.error(message);
  process.exit(1);
}

function loadServiceAccount() {
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
    ? path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS)
    : path.join(__dirname, '..', 'serviceAccountKey.json');

  if (!fs.existsSync(credPath)) {
    fail(
      `No service account key found at ${credPath}.\n` +
      'Set GOOGLE_APPLICATION_CREDENTIALS to the key file path, or place it at serviceAccountKey.json in the project root.'
    );
  }

  return require(credPath);
}

function loadNewEvents(inputPath) {
  if (!inputPath) fail('Usage: node scripts/refreshEvents.js path/to/new-events.json');

  const resolved = path.resolve(inputPath);
  if (!fs.existsSync(resolved)) fail(`Input file not found: ${resolved}`);

  const events = JSON.parse(fs.readFileSync(resolved, 'utf8'));
  const validationError = validateEvents(events);
  if (validationError) fail(validationError);

  return events;
}

async function main() {
  const newEvents = loadNewEvents(process.argv[2]);
  const app = initializeApp({ credential: cert(loadServiceAccount()) });

  const { removed, added } = await refreshEvents(getFirestore(app), newEvents);
  console.log(`Removed ${removed} past event(s). Added ${added} new event(s).`);
  process.exit(0);
}

main().catch((error) => {
  console.error('Error refreshing events:', error);
  process.exit(1);
});
