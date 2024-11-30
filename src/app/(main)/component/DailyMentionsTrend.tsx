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

const DailyMentionsTrend: React.FC = () => {
  // Hardcoded data
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // X-axis labels
    datasets: [
      {
        label: "twitter",
        data: [2500, 2000, 3000, 3500, 4000, 4500, 5000], // Data for Twitter
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color
        borderWidth: 2,
        tension: 0.4, // Smooth curve
        fill: true, // Fill the area under the curve
      },
      {
        label: "instagram",
        data: [2000, 1500, 10000, 5000, 4000, 3500, 4500], // Data for Instagram
        borderColor: "rgba(54, 162, 235, 1)", // Line color
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Fill color
        borderWidth: 2,
        tension: 0.4, // Smooth curve
        fill: true, // Fill the area under the curve
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top", // Position of the legend
        labels: {
          usePointStyle: true, // Make the legend use point styles
        },
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide gridlines on X-axis
        },
      },
      y: {
        beginAtZero: true, // Start Y-axis at 0
        ticks: {
          stepSize: 2500, // Interval between Y-axis ticks
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <h3 style={{ marginBottom: "10px", fontSize: "18px", fontWeight: "bold" }}>Daily Mentions Trend</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default DailyMentionsTrend;
