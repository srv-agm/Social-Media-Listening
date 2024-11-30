import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MentionsByPlatformProps {
  platformData: {
    mentions: number[];
    platforms: string[];
  };
}

const MentionsByPlatform: React.FC<MentionsByPlatformProps> = ({ platformData }) => {
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
  };

  const data = {
    labels: platformData.platforms,
    datasets: [
      {
        label: 'Mentions',
        data: platformData.mentions,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(75, 192, 192)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default MentionsByPlatform;
