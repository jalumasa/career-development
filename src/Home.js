import React from 'react';
import { FaArrowRight, FaBook, FaChevronDown, FaCompass, FaHandshake, FaRobot, FaRocket, FaUserPlus, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Home.css';
import Reveal from './components/Reveal';

const FEATURES = [
  {
    icon: <FaBook />,
    title: 'Curated Resources',
    description: "Guides on resumes, interviews, and the moves that actually matter — written to be used, not just read.",
    to: '/resources',
  },
  {
    icon: <FaUsers />,
    title: 'Real Events',
    description: 'Networking events worth showing up to, in person and online — not another dead calendar invite.',
    to: '/networking',
  },
  {
    icon: <FaHandshake />,
    title: '1:1 Mentorship',
    description: "Book time with mentors who've already done the thing you're trying to do.",
    to: '/mentorship',
  },
  {
    icon: <FaRobot />,
    title: 'AI Career Assistant',
    description: "Ask the awkward questions at 2am. Compass doesn't mind.",
    to: '/chatbot',
  },
];

const STEPS = [
  {
    icon: <FaUserPlus />,
    title: 'Create your account',
    description: "Takes less than a minute. No credit card, no catch.",
  },
  {
    icon: <FaCompass />,
    title: 'Explore what fits',
    description: 'Browse resources, events, and mentors built around where you actually are.',
  },
  {
    icon: <FaRocket />,
    title: 'Take the next step',
    description: 'Book a mentor, attend an event, or just ask the chatbot what to do next.',
  },
];

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="hero-text">
          <p className="eyebrow">Find your direction</p>
          <h1>Build the career <span className="text-gradient">you actually want</span></h1>
          <p className="hero-subtitle">
            Compass is resources, real people, and an AI that actually helps —
            everything you need to stop drifting and start moving.
          </p>
          <div className="home-buttons">
            <Link to="/login" className="home-button home-button-primary">
              Get Started — It's Free
            </Link>
            <Link to="/resources" className="home-button home-button-ghost">
              Explore Resources
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-mockup">
            <div className="hero-mockup-bar">
              <span className="hero-mockup-avatar">
                <FaRobot />
              </span>
              <div className="hero-mockup-bar-text">
                <span className="hero-mockup-name">Compass AI</span>
                <span className="hero-mockup-status">
                  <span className="hero-mockup-status-dot" />
                  Online
                </span>
              </div>
            </div>
            <div className="hero-mockup-chat">
              <div className="hero-mockup-bubble hero-mockup-bubble-user">
                I keep getting rejected after final rounds. What am I missing?
              </div>
              <div className="hero-mockup-bubble hero-mockup-bubble-ai">
                Usually it's not skill — it's how you're telling the story. Want to walk through your last one?
                <span className="hero-mockup-caret" />
              </div>
            </div>
          </div>
        </div>

        <a href="#features" className="scroll-cue" aria-label="Scroll to explore">
          <FaChevronDown />
        </a>
      </section>

      <section id="features" className="section">
        <Reveal className="section-heading">
          <p className="eyebrow">What's inside</p>
          <h2>Everything you need, in one place</h2>
          <p className="section-subtitle">
            No more juggling five tabs and a half-finished spreadsheet.
          </p>
        </Reveal>

        <div className="feature-grid">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 80}>
              <Link to={feature.to} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="feature-link">
                  Explore <FaArrowRight />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <Reveal className="section-heading">
          <p className="eyebrow">How it works</p>
          <h2>Three steps. No guesswork.</h2>
        </Reveal>

        <div className="steps">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 100} className="step">
              <div className="step-icon">{step.icon}</div>
              <div className="step-number">{String(i + 1).padStart(2, '0')}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section mission">
        <Reveal>
          <p className="mission-quote">
            "We think career growth shouldn't be something you figure out alone,
            at midnight, from fifteen open tabs."
          </p>
          <p className="mission-body">
            That's why Compass brings resources, real people, and on-demand
            AI guidance into one place — so the next step is always clear.
          </p>
        </Reveal>
      </section>

      <section className="cta-band">
        <Reveal>
          <h2>Ready to find your direction?</h2>
          <p>Join Compass and see what's actually next for your career.</p>
          <Link to="/login" className="home-button home-button-primary">
            Get Started Free
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

export default Home;
