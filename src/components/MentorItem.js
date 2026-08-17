import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import './MentorItem.css';

const MentorItem = ({ mentor, onBook }) => {
  const initials = (mentor.name || '?').trim().charAt(0).toUpperCase();

  return (
    <div className="card mentor-card">
      <div className="mentor-card-avatar">{initials}</div>
      {mentor.specialty && <span className="card-category">{mentor.specialty}</span>}
      <h2>{mentor.name}</h2>
      <p className="mentor-card-bio">{mentor.bio}</p>
      <div className="mentor-card-actions">
        {onBook && (
          <button type="button" className="mentor-card-book" onClick={() => onBook(mentor)}>
            Request a session
          </button>
        )}
        <a href={`mailto:${mentor.contactEmail}`} className="mentor-card-email" aria-label={`Email ${mentor.name}`}>
          <FaEnvelope />
        </a>
      </div>
    </div>
  );
};

export default MentorItem;
