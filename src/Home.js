// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import desktop from './images/colorful.jpg';

function Home() {
  return (
    <div className="home nunito-regular">
      <div className="hero">
        <img src={desktop} alt="Hero" />
        <div className="hero-text">
          <h1>Welcome to Career Development</h1>
          <p>Explore resources, network with professionals, get mentorship, and chat with our AI for career guidance.</p>
          <div className="home-buttons">
            <Link to="/resources" className="home-button">Career Resources</Link>
            <Link to="/networking" className="home-button">Networking Events</Link>
            <Link to="/mentorship" className="home-button">Career Mentorship</Link>
            <Link to="/chatbot" className="home-button">Career AI Chatbot</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
