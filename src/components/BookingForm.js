import React, { useEffect, useState } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { addDoc, auth, collection, db } from '../firebase';

const EMPTY_FORM = { name: '', email: '', mentorId: '', date: '' };

const BookingForm = ({ mentors, selectedMentorId, onBooked }) => {
  const user = auth.currentUser;
  const [formData, setFormData] = useState({
    ...EMPTY_FORM,
    name: user?.displayName || '',
    email: user?.email || '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // A "Request a session" click on a mentor card preselects that mentor here.
  useEffect(() => {
    if (selectedMentorId) {
      setFormData((prev) => ({ ...prev, mentorId: selectedMentorId }));
    }
  }, [selectedMentorId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mentor = mentors.find((m) => m.id === formData.mentorId);
    if (!mentor) {
      setError('Please select a mentor.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        name: formData.name.trim(),
        email: formData.email.trim(),
        mentorId: mentor.id,
        mentorName: mentor.name,
        date: formData.date,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setFormData({ ...EMPTY_FORM, name: formData.name, email: formData.email });
      setSuccess(`Request sent to ${mentor.name}. They'll reach out at ${formData.email}.`);
      onBooked?.();
    } catch (err) {
      console.error('Error submitting booking:', err);
      setError('Something went wrong sending your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card booking-form" onSubmit={handleSubmit}>
      <h2>Book a Mentor</h2>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
      <select name="mentorId" value={formData.mentorId} onChange={handleChange} required>
        <option value="" disabled>Select Mentor</option>
        {mentors.map((mentor) => (
          <option key={mentor.id} value={mentor.id}>{mentor.name} — {mentor.specialty}</option>
        ))}
      </select>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <button type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Submit'}</button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
};

export default BookingForm;
