import React from 'react';

const EventItem = ({ event }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    return date.toLocaleDateString("en-US");
  };

  return (
    <div className="card">
      <h2>{event.name}</h2>
      <p>{formatDate(event.date)}</p>
      <p>{event.location}</p>
      <a href={event.link} target="_blank" rel="noopener noreferrer">Click Here For More Info</a>
    </div>
  );
};

export default EventItem;
