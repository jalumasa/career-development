import React from 'react';
import { FaBook, FaHandshake, FaRobot, FaUsers } from 'react-icons/fa';

const PILLARS = [
  {
    icon: <FaBook />,
    title: 'Original guides, not link-dumps',
    description: "Every resource is written for this app specifically — a real answer to a real question, not a redirect to somewhere else.",
  },
  {
    icon: <FaUsers />,
    title: 'Events worth showing up to',
    description: 'Real, current networking events — in person and online — refreshed on a schedule instead of going stale.',
  },
  {
    icon: <FaHandshake />,
    title: 'People, not just content',
    description: "Mentors you can actually book time with, when a guide isn't enough and you need a real conversation.",
  },
  {
    icon: <FaRobot />,
    title: 'AI that stays in its lane',
    description: "Compass AI is built specifically for career questions — not a general chatbot wearing a career-themed skin.",
  },
];

const About = () => {
  return (
    <div className="container legal-page about-page">
      <h1>About Compass</h1>
      <p className="legal-updated">A career-development platform built around one idea: help people find direction, not just information.</p>

      <p>
        Most career advice online is either generic ("dress for the job you want")
        or locked behind a paywall. Most job boards and event listings go stale the
        month after someone builds them. Compass exists to fix both problems for
        one place: a single app where the resources are actually worth reading, the
        events are actually current, and getting real human advice doesn't require
        cold-emailing a stranger on LinkedIn.
      </p>

      <h2>What we believe</h2>
      <div className="card-grid about-pillars">
        {PILLARS.map((pillar) => (
          <div className="card about-pillar" key={pillar.title}>
            <div className="about-pillar-icon">{pillar.icon}</div>
            <h3>{pillar.title}</h3>
            <p>{pillar.description}</p>
          </div>
        ))}
      </div>

      <h2>Who this is for</h2>
      <p>
        Anyone figuring out their next move — a first job, a pivot into a new
        field, a promotion you're not sure how to ask for, or just the sense
        that you're drifting and want a clearer sense of direction. Compass
        doesn't assume you're at any particular stage; it just tries to be
        useful at whichever one you're actually in.
      </p>

      <h2>Get in touch</h2>
      <p>
        Questions, feedback, or an idea for something Compass should cover —
        we'd like to hear it. Reach us on the <a href="/contact">Contact</a> page.
      </p>
    </div>
  );
};

export default About;
