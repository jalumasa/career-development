import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase'; // Import db from firebase.js
import './AdminPanel.css';

const AdminPanel = () => {
  const [resource, setResource] = useState({ title: '', description: '', link: '' });
  const [networkingEvent, setNetworkingEvent] = useState({ title: '', description: '', date: '', location: '' });
  const [mentor, setMentor] = useState({ name: '', bio: '', specialty: '', contactEmail: '' });

  const handleChange = (e, setState, state) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleAddResource = async () => {
    await addDoc(collection(db, 'resources'), resource);
    setResource({ title: '', description: '', link: '' });
  };

  const handleAddEvent = async () => {
    await addDoc(collection(db, 'networking'), networkingEvent);
    setNetworkingEvent({ title: '', description: '', date: '', location: '' });
  };

  const handleAddMentor = async () => {
    await addDoc(collection(db, 'mentorship'), mentor);
    setMentor({ name: '', bio: '', specialty: '', contactEmail: '' });
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
      </div>
      <div className="admin-section">
        <h2>Add Networking Event</h2>
        <input type="text" name="title" value={networkingEvent.title} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} placeholder="Title" />
        <textarea name="description" value={networkingEvent.description} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} placeholder="Description"></textarea>
        <input type="date" name="date" value={networkingEvent.date} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} />
        <input type="text" name="location" value={networkingEvent.location} onChange={(e) => handleChange(e, setNetworkingEvent, networkingEvent)} placeholder="Location" />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
      <div className="admin-section">
        <h2>Add Mentor</h2>
        <input type="text" name="name" value={mentor.name} onChange={(e) => handleChange(e, setMentor, mentor)} placeholder="Name" />
        <textarea name="bio" value={mentor.bio} onChange={(e) => handleChange(e, setMentor, mentor)} placeholder="Bio"></textarea>
        <input type="text" name="specialty" value={mentor.specialty} onChange={(e) => handleChange(e, setMentor, mentor)} placeholder="Specialty" />
        <input type="email" name="contactEmail" value={mentor.contactEmail} onChange={(e) => handleChange(e, setMentor, mentor)} placeholder="Contact Email" />
        <button onClick={handleAddMentor}>Add Mentor</button>
      </div>
    </div>
  );
};

export default AdminPanel;
