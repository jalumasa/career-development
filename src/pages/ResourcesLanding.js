import React from 'react';
import { FaBook } from 'react-icons/fa';
import SectionLanding from '../components/SectionLanding';

const BENEFITS = [
  {
    title: 'Real, actionable guides',
    description: 'No fluff — every resource is written to help you do something specific, like write a resume or prep for an interview.',
  },
  {
    title: 'Always growing',
    description: 'New resources get added as the team finds what actually helps.',
  },
  {
    title: 'Free with your account',
    description: "Every resource is included the moment you sign up — nothing extra to unlock.",
  },
];

const ResourcesLanding = () => (
  <SectionLanding
    icon={<FaBook />}
    eyebrow="Career Resources"
    title="Guides for wherever you are in your career"
    description="From your first resume to your next promotion — practical guides written to be used, not just read."
    benefits={BENEFITS}
    collectionName="resources"
    renderTeaser={(item) => (
      <>
        {item.category && <span className="card-category">{item.category}</span>}
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
      </>
    )}
  />
);

export default ResourcesLanding;
