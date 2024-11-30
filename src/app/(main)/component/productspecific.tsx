import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ProductMentionsChartProps {
  data: { product: string; positive: number; negative: number }[];
}

const ProductMentionsChart: React.FC<ProductMentionsChartProps> = ({
  data,
}) => {
  const labels = data.map((item) => item.product);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Positive",
        data: data.map((item) => item.positive),
        backgroundColor: "#76c7c0", // Green color
      },
      {
        label: "Negative",
        data: data.map((item) => item.negative),
        backgroundColor: "#8e91f5", // Purple color
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Post Categorization",
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

export default ProductMentionsChart;
