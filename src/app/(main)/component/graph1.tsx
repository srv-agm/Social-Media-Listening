import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MentionsByPlatformBar: React.FC = () => {
  const barChartData = {
    labels: ['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'TikTok'], // Labels for X-axis
    datasets: [
      {
        label: 'Mentions',
        data: [10, 20, 30, 15, 5], // Values for each platform
        backgroundColor: [
          'rgba(102, 51, 153, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(102, 51, 153, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Legend position
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hides gridlines for X-axis
        },
        title: {
          display: true,
          text: 'Platforms',
        },
      },
      y: {
        beginAtZero: true, // Y-axis starts at zero
        title: {
          display: true,
          text: 'Mentions Count',
        },
      },
    },
  };

  return (
    <div className="mentions-by-platform-bar">
      <h2>Mentions by Platform</h2>
      <Bar data={barChartData} options={options} />
    </div>
  );
};

export default MentionsByPlatformBar;
