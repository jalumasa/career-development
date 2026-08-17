import React from 'react';

const TermsOfService = () => {
  return (
    <div className="container legal-page">
      <h1>Terms of Service</h1>
      <p className="legal-updated">Last updated: August 2026</p>

      <h2>Using this service</h2>
      <p>
        By creating an account, you agree to provide accurate information and to keep
        your login credentials secure. You're responsible for activity that happens
        under your account.
      </p>

      <h2>The AI chatbot isn't professional advice</h2>
      <p>
        The Career AI Chatbot generates responses using a third-party AI model. It can
        be wrong, incomplete, or out of date. Nothing it says is professional career,
        legal, or financial advice — use your own judgment, and verify anything
        important before acting on it.
      </p>

      <h2>Mentorship bookings</h2>
      <p>
        Submitting a booking request is a request to connect with a mentor, not a
        guarantee that a session will take place. We aren't a party to whatever
        arrangement you and a mentor come to.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Don't use this service to harass others, submit false information, attempt to
        access accounts or data that aren't yours, or disrupt the platform for other
        users.
      </p>

      <h2>Content</h2>
      <p>
        Resources, events, and mentor listings are provided for informational purposes
        and may be added or removed by administrators at any time. We don't guarantee
        their accuracy.
      </p>

      <h2>No warranty, limited liability</h2>
      <p>
        This service is provided "as is," without warranties of any kind. To the
        extent permitted by law, we aren't liable for damages arising from your use of
        the service.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms as the service evolves. Continuing to use the service
        after a change means you accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions: <a href="mailto:hello@getcompass.app">hello@getcompass.app</a>
      </p>

      <p className="legal-disclaimer">
        This is a template appropriate for a small project — it has not been reviewed
        by a lawyer. Before relying on it for a real product, have it reviewed by
        counsel familiar with your jurisdiction.
      </p>
    </div>
  );
};

export default TermsOfService;
