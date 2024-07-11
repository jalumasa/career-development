import React, { useEffect, useState } from 'react';
import EventItem from '../components/EventItem';
import { collection, db, getDocs } from '../firebase'; // Import Firebase config and Firestore functions

const Networking = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = [];
      const querySnapshot = await getDocs(collection(db, 'events'));
      querySnapshot.forEach((doc) => {
        eventsData.push(doc.data());
      });
      setEvents(eventsData);
      setFilteredEvents(eventsData);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, events]);

  return (
    <div className="container">
      <h1>Networking Events</h1>
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {filteredEvents.map((event, index) => (
        <EventItem key={index} event={event} />
      ))}
    </div>
  );
};

export default Networking;
