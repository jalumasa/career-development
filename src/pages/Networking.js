import React, { useEffect, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import CategoryFilter from '../components/CategoryFilter';
import EventItem from '../components/EventItem';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchCollection } from '../firebase';
import useGeolocation from '../hooks/useGeolocation';
import useNearbyEvents from '../hooks/useNearbyEvents';
import { formatEventLocation } from '../utils/events';
import './Networking.css';

const Networking = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [nearMeOnly, setNearMeOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const geolocation = useGeolocation();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await fetchCollection('events');
        eventsData.sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const visibleEvents = useNearbyEvents(events, geolocation.coords, { nearbyOnly: nearMeOnly });

  const term = searchTerm.toLowerCase();
  const filteredEvents = visibleEvents.filter((event) => {
    const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
    const haystack = `${event.name || ''} ${formatEventLocation(event)} ${event.category || ''}`.toLowerCase();
    return matchesCategory && haystack.includes(term);
  });

  const handleFindNearMe = () => {
    setNearMeOnly(true);
    if (geolocation.status === 'idle' || geolocation.status === 'error') {
      geolocation.requestLocation();
    }
  };

  return (
    <div className="container filter-page">
      <h1>Networking Events</h1>
      <p className="page-subtitle">In-person and online events, refreshed weekly.</p>

      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <CategoryFilter items={events} active={activeCategory} onChange={setActiveCategory} />

      <div className="near-me-row">
        <button
          type="button"
          className="near-me-button"
          onClick={handleFindNearMe}
          disabled={geolocation.status === 'loading'}
        >
          <FaLocationArrow />
          {geolocation.status === 'loading' ? 'Finding your location…' : 'Find events near me'}
        </button>

        {nearMeOnly && geolocation.status === 'granted' && (
          <span className="near-me-status">
            Showing events near {geolocation.label || 'your location'}.{' '}
            <button type="button" className="link-button-inline" onClick={() => setNearMeOnly(false)}>Show all</button>
          </span>
        )}

        {geolocation.status === 'denied' && (
          <span className="near-me-status near-me-status-error">
            Location access was denied — you can still browse all events below.
          </span>
        )}

        {geolocation.status === 'error' && (
          <span className="near-me-status near-me-status-error">
            Couldn't determine your location right now.
          </span>
        )}
      </div>

      {loading ? (
        <LoadingIndicator />
      ) : filteredEvents.length === 0 ? (
        <p className="empty-state">No events match right now — check back soon.</p>
      ) : (
        <div className="card-grid">
          {filteredEvents.map((event) => (
            <EventItem key={event.id} event={event} distanceMiles={event.distance} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Networking;
