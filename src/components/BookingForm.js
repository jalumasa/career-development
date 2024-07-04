import React, { useState } from 'react';
import { db } from '../firebase'; // Import Firebase config

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    mentor: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection('bookings').add(formData);
    setFormData({
      name: '',
      email: '',
      date: '',
      mentor: ''
    });
    alert('Booking request sent!');
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Book a Mentor</h2>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <input type="text" name="mentor" value={formData.mentor} onChange={handleChange} placeholder="Mentor's Name" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookingForm;
