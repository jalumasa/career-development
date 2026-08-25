import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { collection, getCountFromServer } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ErrorState from '../components/ErrorState';
import LoadingIndicator from '../components/LoadingIndicator';
import { db } from '../firebase';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Chart.js paints to a canvas, so it can't read CSS custom properties the way
// the rest of the app does — the values have to be resolved to real colors at
// render time. Reading them from the document means the chart follows the
// theme toggle instead of being pinned to whichever theme was hardcoded.
const readThemeColor = (token, fallback) => {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  return value || fallback;
};

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, resources: 0, bookings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Re-resolving the palette when the theme attribute flips is what makes the
  // axis labels and grid lines legible in both themes.
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setTheme(document.documentElement.getAttribute('data-theme') || 'dark')
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      // Only the counts are needed — getCountFromServer avoids downloading
      // (and paying a read for) every document just to call .size on it.
      const [users, resources, bookings] = await Promise.all([
        getCountFromServer(collection(db, 'users')),
        getCountFromServer(collection(db, 'resources')),
        getCountFromServer(collection(db, 'bookings')),
      ]);

      setStats({
        users: users.data().count,
        resources: resources.data().count,
        bookings: bookings.data().count,
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const data = useMemo(
    () => ({
      // These are document counts, not engagement metrics — the labels used to
      // read "Active Users" and "Resource Views", which claimed to measure
      // things the app never tracked.
      labels: ['Registered Users', 'Published Resources', 'Mentor Bookings'],
      datasets: [
        {
          label: '',
          data: [stats.users, stats.resources, stats.bookings],
          backgroundColor: [
            'rgba(99, 102, 241, 0.35)',
            'rgba(59, 130, 246, 0.35)',
            'rgba(20, 184, 166, 0.35)',
          ],
          borderColor: ['#6366f1', '#3b82f6', '#14b8a6'],
          borderWidth: 2,
          borderRadius: 6,
        },
      ],
    }),
    [stats]
  );

  const options = useMemo(() => {
    // Re-resolved whenever the theme flips. The fallbacks track `theme` too,
    // so a browser that can't hand back the custom property still gets the
    // colors for the theme actually on screen.
    const isLight = theme === 'light';
    const tickColor = readThemeColor('--color-text-muted', isLight ? '#4b5a75' : '#9fb0c9');
    const gridColor = readThemeColor('--color-border', isLight ? '#d7e3f0' : '#253148');

    return {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      plugins: {
        legend: { display: false },
        title: { display: false },
      },
      scales: {
        x: {
          ticks: { color: tickColor },
          grid: { color: gridColor },
        },
        y: {
          beginAtZero: true,
          ticks: { color: tickColor, precision: 0 },
          grid: { color: gridColor },
        },
      },
    };
  }, [theme]);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorState message="We couldn't load the dashboard stats right now." onRetry={fetchData} />
      ) : (
        <>
          <div className="chart-container">
            <div className="chart">
              <Bar data={data} options={options} />
            </div>
          </div>
          <div className="stats">
            <div className="stat-item">Registered Users: {stats.users}</div>
            <div className="stat-item">Published Resources: {stats.resources}</div>
            <div className="stat-item">Mentor Bookings: {stats.bookings}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
