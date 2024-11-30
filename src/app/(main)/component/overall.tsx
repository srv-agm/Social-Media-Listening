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

const PieChart: React.FC = () => {
    // Hardcoded data for the pie chart
    const data = {
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [
            {
                label: 'Sentiment Analysis',
                data: [40, 35, 25], // Adjust these values to fit your data
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
