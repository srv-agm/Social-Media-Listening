import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


interface MentionsByPlatformProps {
  platformData?: number[]; 
}

const MentionsByPlatform: React.FC<MentionsByPlatformProps> = ({ platformData = [10, 20, 30, 15, 5] }) => {
  const barChartData = {
    labels: ['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'TikTok'],
    datasets: [
      {
        label: 'Mentions',
        data: platformData, 
        backgroundColor: 'rgba(102, 51, 153, 0.6)',
        borderColor: 'rgba(102, 51, 153, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, 
      },
      title: {
        display: true,
        text: 'Mentions by Platform',
      },
    },
    scales: {
      x: {
        type: 'category' as const, 
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mentions-by-platform">
      <h2>Mentions by Platform</h2>
      <Bar data={barChartData} options={options} />
    </div>
  );
};

export default MentionsByPlatform;
