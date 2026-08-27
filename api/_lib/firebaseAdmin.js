// Shared server-side Firebase Admin access for the API routes.
//
// Credentials come from FIREBASE_SERVICE_ACCOUNT_KEY (a Vercel env var holding
// the whole service-account JSON on one line) — never from a file in the repo.
//
// Files under api/_lib are helpers, not endpoints: Vercel only treats a file as
// a serverless function if it exports a handler, so this is not routable.

const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

/** A deployment problem (missing or malformed credentials), not a caller problem. */
class ConfigError extends Error {}

// Vercel reuses a warm container across invocations, and initializeApp throws
// if it runs twice — so the guard is load-bearing, not defensive.
function ensureApp() {
  if (getApps().length > 0) return;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new ConfigError('FIREBASE_SERVICE_ACCOUNT_KEY is not set');
  }

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(raw);
  } catch (error) {
    throw new ConfigError('FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON (it must be the whole service-account file on one line)');
  }

  initializeApp({ credential: cert(serviceAccount) });
}

function getDb() {
  ensureApp();
  return getFirestore();
}

/**
 * Verifies the Firebase ID token on an `Authorization: Bearer …` header.
 *
 * Returns `{ user }` on success, otherwise `{ reason }`:
 *   'unauthenticated' — no token, or one that is malformed, expired, or not
 *                       signed for this project. The caller's problem.
 *   'misconfigured'   — the server has no usable service-account credential,
 *                       so no token could be verified. Our problem.
 *
 * Keeping these apart matters: folding them together meant a missing env var
 * told a signed-in user they were signed out, and the only way to tell the two
 * cases apart was reading the deployment logs.
 *
 * Route guards in the React app are UX only — anyone can call these endpoints
 * directly — so anything that costs money or touches user data has to check
 * the caller here, on the server.
 */
async function verifyRequestUser(req) {
  const match = /^Bearer (.+)$/.exec(req.headers.authorization || '');
  if (!match) return { reason: 'unauthenticated' };

  try {
    ensureApp();
  } catch (error) {
    console.error('Firebase Admin is not configured:', error.message);
    return { reason: 'misconfigured' };
  }

  try {
    return { user: await getAuth().verifyIdToken(match[1]) };
  } catch (error) {
    console.error('ID token verification failed:', error.message);
    return { reason: 'unauthenticated' };
  }
}

module.exports = { getDb, verifyRequestUser };
