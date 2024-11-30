import React, { useState } from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SyncedChartTable: React.FC = () => {
    // Hardcoded data
    const productData = [
        {
            name: "Brand A",
            positive: 3000,
            negative: 1500,
            mentions: 1500,
            issue: "Slow performance",
        },
        {
            name: "Brand B",
            positive: 2500,
            negative: 1200,
            mentions: 1200,
            issue: "Battery life",
        },
        {
            name: "Brand C",
            positive: 2000,
            negative: 800,
            mentions: 800,
            issue: "Screen quality",
        },
        {
            name: "Brand D",
            positive: 1500,
            negative: 600,
            mentions: 600,
            issue: "Price",
        },
        {
            name: "Brand E",
            positive: 1000,
            negative: 400,
            mentions: 400,
            issue: "Customer support",
        },
    ];

    // State for selected product
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

    const labels = productData.map((product) => product.name);

    // Chart data
    const chartData = {
        labels,
        datasets: [
            {
                label: "Positive Mentions",
                data: productData.map((product) => product.positive),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Negative Mentions",
                data: productData.map((product) => product.negative),
                backgroundColor: "rgba(153, 102, 255, 0.6)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Product-Specific Mentions",
            },
        },
        onClick: (event: any, elements: any) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const productName = labels[index];
                setSelectedProduct(productName);
            }
        },
    };

    return (
        <div>
            <h2>Product-Specific Mentions</h2>
            <Bar data={chartData} options={chartOptions} />

            <table style={{ width: "100%", marginTop: "20px", border: "1px solid #ddd", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Product Name</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Mentions</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Top Issue Highlight</th>
                    </tr>
                </thead>
                <tbody>
                    {productData.map((product) => (
                        <tr
                            key={product.name}
                            style={{
                                backgroundColor: selectedProduct === product.name ? "#f0f8ff" : "white",
                            }}
                        >
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.name}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.mentions}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.issue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SyncedChartTable;
