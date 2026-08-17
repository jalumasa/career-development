import React from 'react';
import { FaHandshake } from 'react-icons/fa';
import SectionLanding from '../components/SectionLanding';

const BENEFITS = [
  {
    title: 'Real mentor profiles',
    description: "Bios and specialties, so you know who you'd actually be talking to.",
  },
  {
    title: 'Book directly',
    description: "Send a booking request in a couple clicks once you're signed in.",
  },
  {
    title: 'Free to book',
    description: 'No cost to request a session — ever.',
  },
];

const MentorshipLanding = () => (
  <SectionLanding
    icon={<FaHandshake />}
    eyebrow="Career Mentorship"
    title="Learn from people who've done it"
    description="Browse mentor profiles and book time with people working in the field you're aiming for."
    benefits={BENEFITS}
    collectionName="mentors"
    renderTeaser={(item) => (
      <>
        {item.specialty && <span className="card-category">{item.specialty}</span>}
        <h3>{item.name}</h3>
        <p>{item.bio}</p>
      </>
    )}
  />
);

export default MentorshipLanding;
