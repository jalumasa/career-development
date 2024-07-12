import React, { useEffect, useState } from 'react';
import BookingForm from '../components/BookingForm';
import MentorItem from '../components/MentorItem';
import { collection, db, getDocs } from '../firebase'; // Import Firebase config and Firestore functions

const Mentorship = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      const mentorsData = [];
      const querySnapshot = await getDocs(collection(db, 'mentors'));
      querySnapshot.forEach((doc) => {
        mentorsData.push(doc.data());
      });
      setMentors(mentorsData);
    };

    fetchMentors();
  }, []);

  return (
    <div className="container">
      <h1>Career Mentorship</h1>
      {mentors.map((mentor, index) => (
        <MentorItem key={index} mentor={mentor} />
      ))}
      <BookingForm mentors={mentors} />
    </div>
  );
};

export default Mentorship;
