// components/TotalBrandMentions.tsx
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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Correctly define the props interface
interface TotalBrandMentionsProps {
  totalMentions: number;
  growthPercentage: number;
  dailyMentionsData: number[];
}

const TotalBrandMentions: React.FC<TotalBrandMentionsProps> = ({
  totalMentions,
  growthPercentage,
  dailyMentionsData,
}) => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Total Mentions",
        data: dailyMentionsData,
        backgroundColor: "rgba(106, 90, 205, 0.2)",
        borderColor: "rgba(106, 90, 205, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { stepSize: 1000 } },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <h3 style={{ textAlign: "left" }}>Total Brand Mentions</h3>
      <h2 style={{ margin: "0 0 10px", fontSize: "24px", color: "#444" }}>
        {totalMentions.toLocaleString()}
      </h2>
      <p
        style={{
          color: growthPercentage > 0 ? "#28a745" : "#dc3545",
          fontSize: "14px",
        }}
      >
        {growthPercentage > 0 ? "+" : ""}
        {growthPercentage}% from last week
      </p>
      <Line data={data} options={options} />
    </div>
  );
};

export default TotalBrandMentions;
