import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import { BrowserRouter as Router, Link, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Logo from './components/Logo';
import { RequireAdmin, RequireAuth } from './components/RouteGuards';
import SearchBar from './components/SearchBar';
import { auth, db } from './firebase';
import Footer from './Footer';
import Home from './Home'; // Import the new Home.js component
import useTheme from './hooks/useTheme';
import AdminPanel from './pages/AdminPanel';
import ArticleView from './pages/ArticleView';
import CareerResources from './pages/CareerResources';
import Chatbot from './pages/Chatbot';
import ChatbotLanding from './pages/ChatbotLanding';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Mentorship from './pages/Mentorship';
import MentorshipLanding from './pages/MentorshipLanding';
import Networking from './pages/Networking';
import NetworkingLanding from './pages/NetworkingLanding';
import NotificationsPage from './pages/NotificationsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Profile from './pages/Profile';
import ResourcesLanding from './pages/ResourcesLanding';
import SearchResults from './pages/SearchResults';
import TermsOfService from './pages/TermsOfService';

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setIsAdmin(userDoc.data().role === 'admin');
          }
        } catch (error) {
          console.error('Failed to fetch user role:', error);
        }
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  if (loading) {
    return (
      <div className="app-splash">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <Link to="/" className="brand" onClick={closeMenu}>
              <Logo />
            </Link>

            <div className={`nav-panel ${menuOpen ? 'is-open' : ''}`}>
              <ul className="nav-links">
                <li><NavLink to="/resources" onClick={closeMenu}>Resources</NavLink></li>
                <li><NavLink to="/networking" onClick={closeMenu}>Networking</NavLink></li>
                <li><NavLink to="/mentorship" onClick={closeMenu}>Mentorship</NavLink></li>
                <li><NavLink to="/chatbot" onClick={closeMenu}>Chatbot</NavLink></li>
                {user && (
                  <>
                    <li><NavLink to="/notifications" onClick={closeMenu}>Notifications</NavLink></li>
                    <li><NavLink to="/profile" onClick={closeMenu}>Profile</NavLink></li>
                  </>
                )}
                {user && isAdmin && (
                  <>
                    <li><NavLink to="/admin" onClick={closeMenu}>Admin</NavLink></li>
                    <li><NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink></li>
                  </>
                )}
              </ul>
              <div className="nav-utility">
                <SearchBar onSearch={closeMenu} />
                {!user && <NavLink to="/login" onClick={closeMenu} className="nav-cta">Login</NavLink>}
              </div>
            </div>

            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>

            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {menuOpen && <button type="button" className="nav-scrim" aria-label="Close menu" onClick={closeMenu} />}
          </nav>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<RequireAuth user={user} fallback={<ResourcesLanding />}><CareerResources /></RequireAuth>} />
            <Route path="/resources/:id" element={<RequireAuth user={user} fallback={<Navigate to="/resources" />}><ArticleView /></RequireAuth>} />
            <Route path="/networking" element={<RequireAuth user={user} fallback={<NetworkingLanding />}><Networking /></RequireAuth>} />
            <Route path="/mentorship" element={<RequireAuth user={user} fallback={<MentorshipLanding />}><Mentorship /></RequireAuth>} />
            <Route path="/chatbot" element={<RequireAuth user={user} fallback={<ChatbotLanding />}><Chatbot /></RequireAuth>} />
            <Route path="/search" element={<RequireAuth user={user}><SearchResults /></RequireAuth>} />
            <Route path="/notifications" element={<RequireAuth user={user}><NotificationsPage /></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth user={user}><Profile /></RequireAuth>} />
            <Route path="/admin" element={<RequireAdmin user={user} isAdmin={isAdmin}><AdminPanel /></RequireAdmin>} />
            <Route path="/dashboard" element={<RequireAdmin user={user} isAdmin={isAdmin}><Dashboard /></RequireAdmin>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
