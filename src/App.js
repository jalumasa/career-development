import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import logo from './career.png'; // Import your logo file
import SearchBar from './components/SearchBar';
import { auth, db } from './firebase'; // Import Firebase configuration
import Footer from './Footer';
import desktop from './images/colorful.jpg';
import AdminPanel from './pages/AdminPanel'; // Import the AdminPanel component
import CareerResources from './pages/CareerResources';
import Chatbot from './pages/Chatbot';
import Dashboard from './pages/Dashboard'; // Import the Dashboard component
import Login from './pages/Login'; // Import the Login component
import Mentorship from './pages/Mentorship';
import Networking from './pages/Networking';
import Profile from './pages/Profile'; // Import the Profile component
import SearchResults from './pages/SearchResults';

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().role === 'admin');
        }
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

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
              <li><Link to="/profile" className="nunito-regular">Profile</Link></li>
              {isAdmin && (
                <>
                  <li><Link to="/admin" className="nunito-regular">Admin</Link></li>
                  <li><Link to="/dashboard" className="nunito-regular">Dashboard</Link></li>
                </>
              )}
            </ul>
            <SearchBar /> {/* Use the SearchBar component here */}
          </nav>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/resources" element={<CareerResources />} />
            <Route path="/networking" element={<Networking />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={isAdmin ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
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