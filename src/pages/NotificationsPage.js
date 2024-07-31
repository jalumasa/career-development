// src/pages/NotificationsPage.js
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Import auth from firebase.js
import './NotificationsPage.css'; // Create a separate CSS file for styling

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const db = getFirestore();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const q = query(collection(db, 'notifications'), where('userId', '==', currentUser.uid));
        const notificationsSnapshot = await getDocs(q);
        setNotifications(notificationsSnapshot.docs.map(doc => doc.data()));
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-page container">
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
