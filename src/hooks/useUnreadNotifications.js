import { collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { db } from '../firebase';

/**
 * Unread count for the navbar bell.
 *
 * Notifications are admin-written (see firestore.rules) — a user can't set a
 * `read` flag on one. So "seen" is tracked the other way round, as a single
 * `lastSeenNotificationsAt` watermark on the user's own profile document,
 * which they already have permission to update. Anything newer than the
 * watermark is unread.
 *
 * The comparison is done client-side on purpose: `userId ==` plus
 * `timestamp >` is an equality and a range filter on different fields, which
 * Firestore would require a composite index for. At this scale one extra read
 * of the user's own notifications is cheaper than that operational step.
 */
const useUnreadNotifications = (user) => {
  const [count, setCount] = useState(0);

  const refresh = useCallback(async () => {
    if (!user) {
      setCount(0);
      return;
    }

    try {
      const [profileSnap, notificationsSnap] = await Promise.all([
        getDoc(doc(db, 'users', user.uid)),
        getDocs(query(collection(db, 'notifications'), where('userId', '==', user.uid))),
      ]);

      const lastSeen = profileSnap.exists() ? profileSnap.data().lastSeenNotificationsAt : null;
      const lastSeenMs = lastSeen?.toMillis?.() ?? 0;

      const unread = notificationsSnap.docs.filter((notification) => {
        // A serverTimestamp() reads back as null on the writing client until
        // the server confirms it; treat one that hasn't landed yet as new.
        const timestamp = notification.data().timestamp;
        return !timestamp?.toMillis ? true : timestamp.toMillis() > lastSeenMs;
      });

      setCount(unread.length);
    } catch (error) {
      // A badge is not worth surfacing an error over — just don't show one.
      console.error('Failed to count unread notifications:', error);
      setCount(0);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /** Moves the watermark to now, clearing the badge. */
  const markAllSeen = useCallback(async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), { lastSeenNotificationsAt: serverTimestamp() });
      setCount(0);
    } catch (error) {
      console.error('Failed to mark notifications as seen:', error);
    }
  }, [user]);

  return { count, refresh, markAllSeen };
};

export default useUnreadNotifications;
