import React, { useEffect, useState } from 'react';
import BookingForm from '../components/BookingForm';
import MentorItem from '../components/MentorItem';
import { db } from '../firebase'; // Import Firebase config

const Mentorship = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    db.collection('mentors').get().then((querySnapshot) => {
      const mentorsData = [];
      querySnapshot.forEach((doc) => {
        mentorsData.push(doc.data());
      });
      setMentors(mentorsData);
    });
  }, []);

  return (
    <div className="container">
      <h1>Career Mentorship</h1>
      {mentors.map((mentor, index) => (
        <MentorItem key={index} mentor={mentor} />
      ))}
      <BookingForm />
    </div>
  );
};

export default Mentorship;
