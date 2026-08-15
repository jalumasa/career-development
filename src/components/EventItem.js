import React from 'react';
import { FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import { formatEventDateRange, formatEventLocation } from '../utils/events';
import './EventItem.css';

const EventItem = ({ event, distanceMiles }) => {
  return (
    <div className="card event-card">
      <div className="event-card-top">
        {event.category && <span className="card-category">{event.category}</span>}
        {event.isOnline ? (
          <span className="event-online-badge"><FaGlobe /> Online</span>
        ) : (
          distanceMiles != null && (
            <span className="event-distance-badge"><FaMapMarkerAlt /> {Math.round(distanceMiles)} mi away</span>
          )
        )}
      </div>
      <h2>{event.name}</h2>
      <p className="event-card-date">{formatEventDateRange(event)}</p>
      {event.description && <p className="event-card-description">{event.description}</p>}
      <p className="event-card-location">{formatEventLocation(event)}</p>
      {event.link && (
        <a href={event.link} target="_blank" rel="noopener noreferrer">Learn more</a>
      )}
    </div>
  );
};

export default EventItem;
