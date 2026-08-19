// src/pages/NotificationsPage.js
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import { auth } from '../firebase'; // Import auth from firebase.js
import './NotificationsPage.css'; // Create a separate CSS file for styling

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const db = getFirestore();
        const currentUser = auth.currentUser;
        if (currentUser) {
          const q = query(collection(db, 'notifications'), where('userId', '==', currentUser.uid));
          const notificationsSnapshot = await getDocs(q);
          setNotifications(notificationsSnapshot.docs.map(doc => doc.data()));
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-page container">
      <h1>Notifications</h1>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
