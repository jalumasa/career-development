import React from 'react';
import { FaUsers } from 'react-icons/fa';
import SectionLanding from '../components/SectionLanding';
import { formatEventLocation } from '../utils/events';

const BENEFITS = [
  {
    title: 'Real events, real details',
    description: "Dates, locations, and links, so you know exactly what you're signing up for.",
  },
  {
    title: 'Search built in',
    description: "Find events by name or location once you're signed in.",
  },
  {
    title: 'Curated, not crawled',
    description: 'Every event is added by the team — no dead listings or expired meetups.',
  },
];

const NetworkingLanding = () => (
  <SectionLanding
    icon={<FaUsers />}
    eyebrow="Networking Events"
    title="Events worth actually showing up to"
    description="Browse upcoming networking events, in person and online, and see the details before you commit."
    benefits={BENEFITS}
    collectionName="events"
    renderTeaser={(item) => (
      <>
        {item.category && <span className="card-category">{item.category}</span>}
        <h3>{item.name}</h3>
        <p>{formatEventLocation(item)}</p>
      </>
    )}
  />
);

export default NetworkingLanding;
