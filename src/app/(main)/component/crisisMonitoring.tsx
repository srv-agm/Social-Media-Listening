import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CrisisData {
  day: string;
  mentions: string | number;
}

interface Props {
  data: CrisisData[];
}

const CrisisMonitoringChart = ({ data }: Props) => {
  const chartData = {
    labels: data.map((item) => item.day),
    datasets: [
      {
        label: "Negative Mentions",
        data: data.map((item) => Number(item.mentions)),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Crisis Monitoring",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line options={options} data={chartData} />;
};

export default CrisisMonitoringChart;
