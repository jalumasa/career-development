import React, { useState } from 'react';
import { addDoc, collection, db } from '../firebase'; // Import Firebase config and Firestore functions

const BookingForm = ({ mentors }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mentor: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'bookings'), formData);
    setFormData({
      name: '',
      email: '',
      mentor: '',
      date: ''
    });
    alert('Booking request sent!');
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Book a Mentor</h2>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <select name="mentor" value={formData.mentor} onChange={handleChange} required>
        <option value="" disabled>Select Mentor</option>
        {mentors.map((mentor, index) => (
          <option key={index} value={mentor.name}>{mentor.name}</option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookingForm;
