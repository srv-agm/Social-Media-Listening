import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface TotalBrandMentionsProps {
  totalMentions: number; // Total mentions count
  dailyMentionsData: number[]; // Array of daily mentions data
  growthPercentage: any; // Array of daily mentions data
}

const TotalBrandMentions: React.FC<TotalBrandMentionsProps> = ({
  totalMentions,
  dailyMentionsData,
  growthPercentage
}) => {
  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Mentions",
        data: dailyMentionsData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // Optional: Adds smoothing to the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Daily Mentions Over the Week",
      },
    },
    scales: {
      x: {
        type: "category" as const,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="total-brand-mentions">
      <h2>Brand Mentions</h2>
      <p>{totalMentions}</p>
      <p>+{growthPercentage}% from last week</p>
      <Line data={lineChartData} options={options} />
    </div>
  );
};

export default TotalBrandMentions;
