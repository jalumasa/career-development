import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeUsers: 0,
    resourceViews: 0,
    mentorBookings: 0,
  });

  useEffect(() => {
    const db = getFirestore();

    // Fetch data from Firestore and update stats
    const fetchData = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const resourcesSnapshot = await getDocs(collection(db, 'resources'));
      const mentorshipSnapshot = await getDocs(collection(db, 'mentorship'));

      setStats({
        activeUsers: usersSnapshot.size,
        resourceViews: resourcesSnapshot.size, // Replace with actual view count if available
        mentorBookings: mentorshipSnapshot.size, // Replace with actual booking count if available
      });
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <p>Active Users: {stats.activeUsers}</p>
      <p>Resource Views: {stats.resourceViews}</p>
      <p>Mentor Bookings: {stats.mentorBookings}</p>
      {/* Add more dashboard details here */}
    </div>
  );
};

export default Dashboard;
