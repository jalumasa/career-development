import React from 'react';

const MentorItem = ({ mentor }) => {
  return (
    <div className="card">
      <h2>{mentor.name}</h2>
      <p>{mentor.bio}</p>
      <p>Speciality: {mentor.speciality}</p>
      <p>Contact: <a href={`mailto:${mentor.contactEmail}`}>{mentor.contactEmail}</a></p>
    </div>
  );
};

export default MentorItem;
