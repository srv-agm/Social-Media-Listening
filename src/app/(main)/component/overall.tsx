// PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register required elements for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Add type for the props
interface PieChartProps {
    sentimentData: {
        positive: number;
        negative: number;
        neutral: number;
    };
}

const PieChart: React.FC<PieChartProps> = ({ sentimentData }) => {
    const data = {
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [
            {
                label: 'Sentiment Analysis',
                data: [
                    sentimentData.positive,
                    sentimentData.negative,
                    sentimentData.neutral
                ],
                backgroundColor: [
                    '#007bff', // Blue
                    '#ffcc00', // Yellow
                    '#00c49f', // Green
                ],
                borderColor: [
                    '#ffffff',
                    '#ffffff',
                    '#ffffff',
                ],
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
            tooltip: {
                enabled: true,
            },
        },
    };

    return <Pie data={data} options={options} />;
};

export default PieChart;
