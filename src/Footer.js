import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './components/Logo';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand footer-brand-mark">
            <Logo />
          </Link>
          <p>
            Find your direction. Resources, real people, and an AI that
            actually helps — everything you need to move your career forward.
          </p>
        </div>

        <div className="footer-column">
          <h4>Product</h4>
          <ul>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/networking">Networking</Link></li>
            <li><Link to="/mentorship">Mentorship</Link></li>
            <li><Link to="/chatbot">AI Chatbot</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>&copy; {year} Compass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
