import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface ChartData {
  datasets: {
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    data: (string | number)[];
    fill: boolean;
    label: string;
    tension: number;
  }[];
  labels: string[];
}

interface Props {
  data: ChartData;
}

const DailyMentionsTrend = ({ data }: Props) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Daily Mentions Trend",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Convert string data to numbers
  const chartData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.map(value => Number(value))
    }))
  };

  return <Line options={options} data={chartData} />;
};

export default DailyMentionsTrend;
