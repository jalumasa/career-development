# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Create React App (CRA) single-page app called "career-webapp": a career-development platform where users log in, browse career resources, find networking events, book mentors, and chat with an AI career assistant. Firebase (Auth + Firestore) is the only backend — there is no custom server; all reads/writes go directly from the browser to Firestore.

## Commands

```bash
npm start          # dev server at http://localhost:3000
npm test            # Jest/RTL in watch mode (react-scripts test)
npm run build        # production build to /build
```

Run a single Jest test file: `npm test -- src/App.test.js` (still interactive watch mode; add `-- --watchAll=false` to run once).

Cypress e2e tests (`cypress/e2e/*.cy.js`) require the dev server running at `localhost:3000` in another terminal:

```bash
npx cypress open    # interactive runner
npx cypress run     # headless
```

There is no lint script configured beyond CRA's built-in eslint-on-build (`eslintConfig` in [package.json](package.json) extends `react-app`).

## Architecture

**Routing/auth gate lives in [src/App.js](src/App.js).** It subscribes to `onAuthStateChanged` and renders only a `/login` route when signed out. When signed in, it fetches `users/{uid}` from Firestore to read `role`, and conditionally renders `/admin` and `/dashboard` links/routes when `role === 'admin'`. All other page components assume a signed-in user and call `auth.currentUser` directly rather than receiving the user as a prop — keep that pattern when adding pages.

**Firebase is initialized once in [src/firebase.js](src/firebase.js)**, which exports `auth`, `db`, and re-exports a few Firestore helpers (`collection`, `getDocs`, `addDoc`). Some pages import from this module, others call `getFirestore()`/`getAuth()` again directly (e.g. [src/pages/Dashboard.js](src/pages/Dashboard.js), [src/pages/Profile.js](src/pages/Profile.js)) — both work since Firebase apps are singletons, but prefer importing from `firebase.js` for consistency with newer code.

**No global data layer.** Every page component fetches its own Firestore collection in a `useEffect` (`resources`, `events`, `mentors`, `bookings`, `users`, `notifications`), with no shared cache/context. Admin writes happen in [src/pages/AdminPanel.js](src/pages/AdminPanel.js), which fans out a Firestore batch write to `notifications` for every user whenever a resource/event/mentor is added.

**Chatbot ("Compass AI") calls Claude through a Vercel serverless function**, not from the browser. [api/chatbot.js](api/chatbot.js) holds `ANTHROPIC_API_KEY` server-side (no `REACT_APP_` prefix, so it never reaches the client bundle), calls `@anthropic-ai/sdk` with `model: 'claude-haiku-4-5'` (chosen for cost — the `MODEL` constant at the top of the file is the single place to change it; `claude-sonnet-5` / `claude-opus-5` are the step-ups), and streams the response back as plain text (`anthropic.messages.stream(...)`, piped via `res.write()`). The system prompt defining Compass AI's scope and tone lives inline in that file. [src/services/ChatbotService.js](src/services/ChatbotService.js) exports `streamChatbotResponse(message, history, onChunk)`, which reads the streamed body with `response.body.getReader()` and invokes `onChunk` per token for a live typing effect; it sends up to the last 20 turns of `history` back on each request since the API is stateless. **Local dev caveat:** `npm start` (the CRA dev server) does not serve `/api/*` — use `npx vercel dev` instead if you need to exercise the chatbot locally, or rely on the Vercel preview/production deployment. Set `ANTHROPIC_API_KEY` in Vercel's project env vars for deploys; see [.env.example](.env.example).

**Env vars**: `.env` (gitignored) holds `ANTHROPIC_API_KEY` for local `vercel dev`. The Firebase web config in `firebase.js` is hardcoded (not env-based) — normal for Firebase client apps since these keys aren't secret.

**Admin surfaces:** [AdminPanel.js](src/pages/AdminPanel.js) is CRUD for resources/events/mentors and lists users; [Dashboard.js](src/pages/Dashboard.js) shows a Chart.js bar chart of `users`/`resources`/`bookings` collection sizes. Both are route-gated on `isAdmin` in `App.js`, not on Firestore security rules within this repo — treat the client-side gate as UX only, not the actual authorization boundary. Firestore rules live only in the Firebase console (no `firestore.rules` in this repo) — as of this writing, reads on `events`/`resources`/`mentors` are being denied with `permission-denied` for at least one non-admin signed-in test account; check the rules there before assuming the app code is at fault if Resources/Networking/Mentorship render empty.

**Resources are original in-app articles, not external links.** A `resources` doc is `{title, category, summary, content, readTime}`, where `content` is a Markdown string rendered by [src/pages/ArticleView.js](src/pages/ArticleView.js) (`react-markdown` + `remark-gfm`) at `/resources/:id`. [src/pages/CareerResources.js](src/pages/CareerResources.js) lists them as cards with search + category filtering. [src/data/articleSeeds.js](src/data/articleSeeds.js) holds nine original starter articles; AdminPanel's "Load starter articles" button batch-writes any not already present (dedup by title) through the same `writeBatch` path used for notification fan-out. Legacy docs from the old `{title, description, link}` shape may still exist in Firestore — they render with an empty body/summary since the fields don't match; delete them via AdminPanel's existing per-row delete button once the starter articles are loaded.

**Events use structured location fields, not a Timestamp.** An `events` doc is `{name, description, category, isOnline, city, region, country, lat, lng, startDate, endDate, link}`, where `startDate`/`endDate` are plain `'YYYY-MM-DD'` strings — this replaces the old `date` field, which was a source of a real bug: [src/components/EventItem.js](src/components/EventItem.js) used to expect a Firestore Timestamp (`.seconds`/`.nanoseconds`) while AdminPanel wrote a plain date string from its `<input type="date">`, so every event crashed on render. Plain ISO strings on both sides fix that. [src/pages/Networking.js](src/pages/Networking.js) fetches, sorts by `startDate`, and supports a "Find events near me" geolocation filter: [src/hooks/useGeolocation.js](src/hooks/useGeolocation.js) wraps `navigator.geolocation` + a Nominatim reverse-geocode call for a human-readable label, and [src/utils/geo.js](src/utils/geo.js) has the haversine distance calc used to sort/filter in-person events within ~500 miles; online events (`isOnline: true`, no `lat`/`lng`) always show regardless of distance. [src/data/eventSeeds.js](src/data/eventSeeds.js) holds nine real, current events (in-person + online) as of this writing; AdminPanel's "Load starter events" button seeds them the same way starter articles are loaded.

**Weekly event refresh runs as a scheduled cloud Claude Code routine that POSTs to a Vercel endpoint — it does not touch Firestore directly.** Cloud routines have no access to local files or env vars, so the Firebase Admin credential can't live in the routine itself; it lives in Vercel, same as `ANTHROPIC_API_KEY`. The routine's prompt (see the routine config, `https://claude.ai/code/routines`) does the actual web research each week (find real current in-person + online networking events), then `POST`s the results to `/api/refresh-events` with an `X-Refresh-Secret` header. [api/refresh-events.js](api/refresh-events.js) validates that header against `EVENTS_REFRESH_SECRET`, then uses `firebase-admin` (credentials from `FIREBASE_SERVICE_ACCOUNT_KEY`, a Vercel env var holding the full service-account JSON as one line) to remove `events` docs whose `endDate` has passed and add anything genuinely new (dedup by name+startDate). [scripts/refreshEvents.js](scripts/refreshEvents.js) is the local-dev equivalent of the same logic (reads a service account key from `GOOGLE_APPLICATION_CREDENTIALS` or `serviceAccountKey.json` in the repo root — gitignored, never commit it) for testing the refresh logic or running it by hand without waiting for the schedule.

**App.js uses a single persistent `<Router>`**, branching on auth state *inside* it (not two separately-mounted `<Router>` trees) — that split used to cause a real race where `Login.js`'s `navigate('/')` could fire after the login route had already unmounted, leaving the URL stuck at `/login` with a blank authenticated shell underneath. Keep the single-Router structure if you touch auth routing again.

**[src/App.test.js](src/App.test.js) is unmodified CRA boilerplate** (asserts a "learn react" link exists) and does not match the current `Home`/`App` content — it currently fails. Cypress specs under `cypress/e2e/` need an authenticated session for every route but `/login`; use the `cy.login(email, password)` custom command ([cypress/support/commands.js](cypress/support/commands.js)), which wraps `cy.session()`. Login interactions use `{ force: true }` because CRA5's webpack-dev-server error-overlay iframe can intermittently cover the page in Cypress's Electron runner.
