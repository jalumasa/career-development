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

// Vercel reuses a warm container across invocations, and initializeApp throws
// if it runs twice — so the guard is load-bearing, not defensive.
function ensureApp() {
  if (getApps().length === 0) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    initializeApp({ credential: cert(serviceAccount) });
  }
}

function getDb() {
  ensureApp();
  return getFirestore();
}

/**
 * Verifies the Firebase ID token on an `Authorization: Bearer …` header and
 * returns the decoded token, or null when it is missing, malformed, expired,
 * or not signed for this project.
 *
 * Route guards in the React app are UX only — anyone can call these endpoints
 * directly — so anything that costs money or touches user data has to check
 * the caller here, on the server.
 */
async function verifyRequestUser(req) {
  const match = /^Bearer (.+)$/.exec(req.headers.authorization || '');
  if (!match) return null;

  try {
    ensureApp();
    return await getAuth().verifyIdToken(match[1]);
  } catch (error) {
    console.error('ID token verification failed:', error.message);
    return null;
  }
}

module.exports = { getDb, verifyRequestUser };
