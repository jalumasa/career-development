import React from 'react';

const MentorItem = ({ mentor }) => {
  return (
    <div className="card">
      <h2>{mentor.name}</h2>
      <p>{mentor.bio}</p>
    </div>
  );
};

export default MentorItem;
