import React from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register components
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

interface SentimentTrendProps {
  sentimentData: {
    negative: number[];
    neutral: number[];
    positive: number[];
  };
}

const OverallSentimentTrends: React.FC<SentimentTrendProps> = ({ sentimentData }) => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Positive',
        data: sentimentData.positive,
        borderColor: 'green',
        backgroundColor: 'green',
      },
      {
        label: 'Neutral',
        data: sentimentData.neutral,
        borderColor: 'yellow',
        backgroundColor: 'yellow',
      },
      {
        label: 'Negative',
        data: sentimentData.negative,
        borderColor: 'red',
        backgroundColor: 'red',
      },
    ],
  };

  return (
    <div className="overall-sentiment-trends">
      <h2>Sentiment Trends</h2>
      <Line data={data} />
    </div>
  );
};

export default OverallSentimentTrends;
