import React, { useEffect, useState } from 'react';
import EventItem from '../components/EventItem';
import { db } from '../firebase'; // Import Firebase config

const Networking = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    db.collection('events').get().then((querySnapshot) => {
      const eventsData = [];
      querySnapshot.forEach((doc) => {
        eventsData.push(doc.data());
      });
      setEvents(eventsData);
    });
  }, []);

  return (
    <div className="container">
      <h1>Networking Events</h1>
      {events.map((event, index) => (
        <EventItem key={index} event={event} />
      ))}
    </div>
  );
};

export default Networking;
