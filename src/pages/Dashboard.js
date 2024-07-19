import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeUsers: 0,
    resourceViews: 0,
    mentorBookings: 0,
  });

  useEffect(() => {
    const db = getFirestore();

    const fetchData = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const resourcesSnapshot = await getDocs(collection(db, 'resources'));
      const bookingsSnapshot = await getDocs(collection(db, 'bookings')); // Assuming bookings are in 'bookings' collection

      const mentorBookingCount = bookingsSnapshot.size; // Adjust based on your bookings data structure

      setStats({
        activeUsers: usersSnapshot.size,
        resourceViews: resourcesSnapshot.size, // Replace with actual view count if available
        mentorBookings: mentorBookingCount, // Use the actual booking count
      });
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
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
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
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div className="chart-container">
        <div className="chart">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
