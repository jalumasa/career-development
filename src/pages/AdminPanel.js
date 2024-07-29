import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import db and auth from firebase.js
import './AdminPanel.css';

const AdminPanel = () => {
  const [resource, setResource] = useState({ title: '', description: '', link: '' });
  const [resources, setResources] = useState([]);
  const [networkingEvent, setNetworkingEvent] = useState({ name: '', description: '', date: '', location: '', link: '' });
  const [networkingEvents, setNetworkingEvents] = useState([]);
  const [mentor, setMentor] = useState({ name: '', bio: '', specialty: '', contactEmail: '' });
  const [mentors, setMentors] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resourcesSnapshot = await getDocs(collection(db, 'resources'));
        setResources(resourcesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));

        const networkingEventsSnapshot = await getDocs(collection(db, 'events'));
        setNetworkingEvents(networkingEventsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));

        const mentorsSnapshot = await getDocs(collection(db, 'mentors'));
        setMentors(mentorsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));

        const usersSnapshot = await getDocs(collection(db, 'users'));
        setUsers(usersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e, setState, state) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const addNotification = async (type, message) => {
    const batch = getFirestore().batch();
    users.forEach(user => {
      const notificationRef = doc(collection(db, 'notifications'));
      batch.set(notificationRef, {
        userId: user.id,
        type,
        message,
        timestamp: new Date()
      });
    });
    await batch.commit();
  };

  const handleAddResource = async () => {
    try {
      await addDoc(collection(db, 'resources'), resource);
      setResource({ title: '', description: '', link: '' });
      // Reload resources
      const resourcesSnapshot = await getDocs(collection(db, 'resources'));
      setResources(resourcesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      await addNotification('resource', `New resource added: ${resource.title}`);
    } catch (error) {
      console.error("Error adding resource: ", error);
    }
  };

  const handleAddEvent = async () => {
    try {
      await addDoc(collection(db, 'events'), networkingEvent);
      setNetworkingEvent({ name: '', description: '', date: '', location: '', link: '' });
      // Reload networking events
      const networkingEventsSnapshot = await getDocs(collection(db, 'events'));
      setNetworkingEvents(networkingEventsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      await addNotification('event', `New networking event: ${networkingEvent.name}`);
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  const handleAddMentor = async () => {
    try {
      await addDoc(collection(db, 'mentors'), mentor);
      setMentor({ name: '', bio: '', specialty: '', contactEmail: '' });
      // Reload mentors
      const mentorsSnapshot = await getDocs(collection(db, 'mentors'));
      setMentors(mentorsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      await addNotification('mentor', `New mentor added: ${mentor.name}`);
    } catch (error) {
      console.error("Error adding mentor: ", error);
    }
  };

  const handleDelete = async (collectionName, id) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      // Reload items based on the collection
      if (collectionName === 'resources') {
        const resourcesSnapshot = await getDocs(collection(db, 'resources'));
        setResources(resourcesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } else if (collectionName === 'events') {
        const networkingEventsSnapshot = await getDocs(collection(db, 'events'));
        setNetworkingEvents(networkingEventsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } else if (collectionName === 'mentors') {
        const mentorsSnapshot = await getDocs(collection(db, 'mentors'));
        setMentors(mentorsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      }
    } catch (error) {
      console.error(`Error deleting from ${collectionName}: `, error);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="admin-section">
        <h2>Add Resource</h2>
        <input type="text" name="title" value={resource.title} onChange={(e) => handleChange(e, setResource, resource)} placeholder="Title" />
        <textarea name="description" value={resource.description} onChange={(e) => handleChange(e, setResource, resource)} placeholder="Description"></textarea>
        <input type="text" name="link" value={resource.link} onChange={(e) => handleChange(e, setResource, resource)} placeholder="Link" />
        <button onClick={handleAddResource}>Add Resource</button>
        <h3>Existing Resources</h3>
        <ul>
          {resources.map((res) => (
            <li key={res.id}>
              {res.title} <button onClick={() => handleDelete('resources', res.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-section">
        <h2>Add Networking Event</h2>
        <input type="text" name="name" value={networkingEvent.name} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} placeholder="Name" />
        <textarea name="description" value={networkingEvent.description} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} placeholder="Description"></textarea>
        <input type="date" name="date" value={networkingEvent.date} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} />
        <input type="text" name="location" value={networkingEvent.location} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} placeholder="Location" />
        <input type="text" name="link" value={networkingEvent.link} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} placeholder="Link" />
        <button onClick={handleAddEvent}>Add Event</button>
        <h3>Existing Networking Events</h3>
        <ul>
          {networkingEvents.map((event) => (
            <li key={event.id}>
              {event.name} <button onClick={() => handleDelete('events', event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-section">
        <h2>Add Mentor</h2>
        <input type="text" name="name" value={mentor.name} onChange={(e) => handleChange(e, setMentor, mentor)} placeholder="Name" />
        <textarea name="bio" value={mentor.bio} onChange={(e) => handleChange(e, setMentor, mentor)} placeholder="Bio"></textarea>
        <input type="text" name="specialty" value={mentor.specialty} onChange={(e) => handleChange(e, setMentor, mentor)} placeholder="Specialty" />
        <input type="email" name="contactEmail" value={mentor.contactEmail} onChange={(e) => handleChange(e, setMentor, mentor)} placeholder="Contact Email" />
        <button onClick={handleAddMentor}>Add Mentor</button>
        <h3>Existing Mentors</h3>
        <ul>
          {mentors.map((mnt) => (
            <li key={mnt.id}>
              {mnt.name} <button onClick={() => handleDelete('mentors', mnt.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
