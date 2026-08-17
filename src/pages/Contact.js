import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="container legal-page">
      <h1>Contact us</h1>
      <p>
        Questions, feedback, or something not working right? We'd like to
        hear about it.
      </p>

      <a href="mailto:hello@getcompass.app" className="contact-email">
        <FaEnvelope /> hello@getcompass.app
      </a>

      <p className="legal-disclaimer">
        Clicking the address above opens your default mail app. If nothing
        happens, that's usually because your browser doesn't have one
        configured — you can copy the address instead.
      </p>
    </div>
  );
};

export default Contact;
