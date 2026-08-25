import React, { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import BookingForm from '../components/BookingForm';
import ErrorState from '../components/ErrorState';
import LoadingIndicator from '../components/LoadingIndicator';
import MentorItem from '../components/MentorItem';
import { auth, db, fetchCollection } from '../firebase';
import './Mentorship.css';

const formatDate = (isoDate) => {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, (month || 1) - 1, day || 1).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
};

const Mentorship = () => {
  const [mentors, setMentors] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedMentorId, setSelectedMentorId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadBookings = useCallback(async () => {
    try {
      const q = query(collection(db, 'bookings'), where('userId', '==', auth.currentUser.uid));
      const snapshot = await getDocs(q);
      const myBookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      myBookings.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      setBookings(myBookings);
    } catch (error) {
      // Booking history is a nice-to-have on this page — if it fails (e.g. a
      // Firestore rules gap), that shouldn't also take down the mentor list.
      console.error('Error fetching your bookings:', error);
    }
  }, []);

  const loadMentors = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      setMentors(await fetchCollection('mentors'));
    } catch (err) {
      console.error('Error fetching mentors:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMentors();
    loadBookings();
  }, [loadMentors, loadBookings]);

  const handleBook = (mentor) => {
    setSelectedMentorId(mentor.id);
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) {
    return (
      <div className="container mentorship-page">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="container mentorship-page">
      <h1>Career Mentorship</h1>
      <p className="page-subtitle">Browse mentors working in the field you're aiming for, and request time with them.</p>

      {error ? (
        <ErrorState message="We couldn't load the mentors right now." onRetry={loadMentors} />
      ) : mentors.length === 0 ? (
        <p className="empty-state">No mentors are listed yet — check back soon.</p>
      ) : (
        <div className="card-grid">
          {mentors.map((mentor) => (
            <MentorItem key={mentor.id} mentor={mentor} onBook={handleBook} />
          ))}
        </div>
      )}

      <div id="booking-form" className="mentorship-booking-section">
        <BookingForm mentors={mentors} selectedMentorId={selectedMentorId} onBooked={loadBookings} />

        {bookings.length > 0 && (
          <div className="my-bookings">
            <h2>Your requests</h2>
            <ul className="my-bookings-list">
              {bookings.map((booking) => (
                <li key={booking.id} className="my-bookings-item">
                  <div>
                    <strong>{booking.mentorName}</strong>
                    <span className="my-bookings-date"> · {formatDate(booking.date)}</span>
                  </div>
                  <span className={`booking-status booking-status-${booking.status || 'pending'}`}>
                    {booking.status || 'pending'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentorship;
