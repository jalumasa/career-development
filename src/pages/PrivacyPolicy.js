import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container legal-page">
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: September 2026</p>

      <p>
        This policy explains what information Compass collects, why, and how
        it's used. It's written in plain language and describes what this application
        actually does — not a generic template.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Account information</strong> — your email address and password (handled by Firebase Authentication; we never see or store your password ourselves).</li>
        <li><strong>Profile information</strong> — your name and any "information" text you choose to add to your profile.</li>
        <li><strong>Content you submit</strong> — mentorship booking requests, and messages you send to the AI career chatbot.</li>
        <li><strong>Approximate location</strong> — only if you tap "Find events near me" on the Networking page, and only after your browser asks your permission. Your coordinates are used to sort events by distance and to look up a place name to show you. They are never stored in our database, and we never request your location automatically or in the background.</li>
        <li><strong>Basic usage data</strong> — collected automatically by Firebase to keep the service running (e.g. authentication state).</li>
      </ul>

      <h2>How we use it</h2>
      <p>
        To run your account, show you the resources/events/mentors you request, process
        mentorship bookings, and generate chatbot responses. We do not sell your data.
      </p>

      <h2>Third parties</h2>
      <ul>
        <li><strong>Firebase (Google)</strong> handles authentication and stores your account and profile data.</li>
        <li><strong>Anthropic</strong> processes the messages you send to Compass AI in order to generate a response. Don't share anything in the chatbot you wouldn't want sent to a third-party AI provider.</li>
        <li><strong>OpenStreetMap (Nominatim)</strong> receives your coordinates if you use "Find events near me", in order to turn them into a readable place name. This only ever happens after you grant permission.</li>
      </ul>

      <h2>Your choices</h2>
      <p>
        You can update or remove your profile information at any time from the{' '}
        <a href="/profile">Profile</a> page. To delete your account entirely, contact us
        using the details below.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy or your data: <a href="mailto:hello@getcompass.app">hello@getcompass.app</a>
      </p>

      <p className="legal-disclaimer">
        This is a template appropriate for a small project — it has not been reviewed by
        a lawyer. Before relying on it for a real product handling real user data, have
        it reviewed by counsel familiar with your jurisdiction's privacy laws.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
