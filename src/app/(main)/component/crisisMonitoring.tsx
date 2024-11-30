import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CrisisMonitoringChartProps {
  data: { day: string; mentions: number }[];
}

const CrisisMonitoringChart: React.FC<CrisisMonitoringChartProps> = ({ data }) => {
  const labels = data.map((item) => item.day);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Mentions',
        data: data.map((item) => item.mentions),
        backgroundColor: '#8e91f5', // Purple color
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Crisis Monitoring',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default CrisisMonitoringChart;
