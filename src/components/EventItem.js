import React from 'react';

const EventItem = ({ event }) => {
  return (
    <div className="card">
      <h2>{event.name}</h2>
      <p>{event.date}</p>
      <p>{event.location}</p>
      <a href={event.link} target="_blank" rel="noopener noreferrer">More Info</a>
    </div>
  );
};

export default EventItem;
