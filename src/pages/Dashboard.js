import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import LoadingIndicator from '../components/LoadingIndicator';
import { db } from '../firebase';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeUsers: 0,
    resourceViews: 0,
    mentorBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only the document counts are needed, and the three reads are
        // independent — no reason to wait for each one in turn.
        const [usersSnapshot, resourcesSnapshot, bookingsSnapshot] = await Promise.all([
          getDocs(collection(db, 'users')),
          getDocs(collection(db, 'resources')),
          getDocs(collection(db, 'bookings')),
        ]);

        setStats({
          activeUsers: usersSnapshot.size,
          resourceViews: resourcesSnapshot.size,
          mentorBookings: bookingsSnapshot.size,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ['Active Users', 'Resource Views', 'Mentor Bookings'],
    datasets: [
      {
        label: '',
        data: [stats.activeUsers, stats.resourceViews, stats.mentorBookings],
        backgroundColor: [
          'rgba(99, 102, 241, 0.35)',
          'rgba(59, 130, 246, 0.35)',
          'rgba(20, 184, 166, 0.35)',
        ],
        borderColor: [
          '#6366f1',
          '#3b82f6',
          '#14b8a6',
        ],
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      title: {
        display: false, // Hide the title
      },
    },
    scales: {
      x: {
        ticks: { color: '#9fb0c9' },
        grid: { color: '#253148' },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#9fb0c9' },
        grid: { color: '#253148' },
      },
    },
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="chart-container">
            <div className="chart">
              <Bar data={data} options={options} />
            </div>
          </div>
          <div className="stats">
            <div className="stat-item">Active Users: {stats.activeUsers}</div>
            <div className="stat-item">Resource Views: {stats.resourceViews}</div>
            <div className="stat-item">Mentor Bookings: {stats.mentorBookings}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
