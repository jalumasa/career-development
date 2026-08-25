// src/pages/NotificationsPage.js
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import ErrorState from '../components/ErrorState';
import LoadingIndicator from '../components/LoadingIndicator';
import { auth } from '../firebase'; // Import auth from firebase.js
import './NotificationsPage.css'; // Create a separate CSS file for styling

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const db = getFirestore();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const q = query(collection(db, 'notifications'), where('userId', '==', currentUser.uid));
        const notificationsSnapshot = await getDocs(q);
        setNotifications(notificationsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <div className="notifications-page container">
      <h1>Notifications</h1>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorState message="We couldn't load your notifications right now." onRetry={fetchNotifications} />
      ) : notifications.length === 0 ? (
        <p className="empty-state">No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
