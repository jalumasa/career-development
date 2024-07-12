import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import logo from './career.png'; // Import your logo file
import Footer from './Footer';
import desktop from './images/colorful.jpg';
import CareerResources from './pages/CareerResources';
import Chatbot from './pages/Chatbot';
import Mentorship from './pages/Mentorship';
import Networking from './pages/Networking';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <Link to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <ul className="nav-links">
              <li><Link to="/resources" className="nunito-regular">Resources</Link></li>
              <li><Link to="/networking" className="nunito-regular">Networking</Link></li>
              <li><Link to="/mentorship" className="nunito-regular">Mentorship</Link></li>
              <li><Link to="/chatbot" className="nunito-regular">Chatbot</Link></li>
            </ul>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>
          </nav>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/resources" element={<CareerResources />} />
            <Route path="/networking" element={<Networking />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer /> {Footer}
      </div>
    </Router>
  );
}

function HomePage() {
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

export default App;
