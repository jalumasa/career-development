// src/pages/NotificationsPage.js
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import ErrorState from '../components/ErrorState';
import LoadingIndicator from '../components/LoadingIndicator';
import { auth } from '../firebase'; // Import auth from firebase.js
import './NotificationsPage.css'; // Create a separate CSS file for styling

/** "3 hours ago" style label; falls back to a date once it's over a week old. */
const relativeTime = (timestamp) => {
  const date = timestamp?.toDate?.();
  if (!date) return '';

  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';

  const units = [
    ['minute', 60],
    ['hour', 60],
    ['day', 24],
  ];

  let value = seconds;
  let unit = 'second';
  for (const [nextUnit, divisor] of units) {
    if (value < divisor) break;
    value = Math.round(value / divisor);
    unit = nextUnit;
  }

  if (unit === 'day' && value > 7) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  return `${value} ${unit}${value === 1 ? '' : 's'} ago`;
};

const NotificationsPage = ({ onSeen }) => {
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
        const rows = notificationsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // Newest first. Firestore returns documents in arbitrary order without
        // an explicit sort, so these used to appear shuffled.
        rows.sort((a, b) => (b.timestamp?.toMillis?.() ?? 0) - (a.timestamp?.toMillis?.() ?? 0));
        setNotifications(rows);
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

  // Opening the page is what marks them seen, which clears the navbar badge.
  useEffect(() => {
    if (!loading && !error) onSeen?.();
  }, [loading, error, onSeen]);

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
            <li key={notification.id}>
              <span className="notification-message">{notification.message}</span>
              {notification.timestamp && (
                <span className="notification-time">{relativeTime(notification.timestamp)}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
