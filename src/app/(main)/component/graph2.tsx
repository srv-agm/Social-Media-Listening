import React from 'react';
import { Line } from 'react-chartjs-2';


interface SentimentData {
  positive: number[]; 
  neutral: number[]; 
  negative: number[]; 
}

interface OverallSentimentTrendsProps {
  sentimentData: SentimentData; 
}

const OverallSentimentTrends: React.FC<OverallSentimentTrendsProps> = ({ sentimentData }) => {
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Positive',
        data: sentimentData.positive, 
        borderColor: 'rgba(102, 51, 153, 1)',
        backgroundColor: 'rgba(102, 51, 153, 0.2)',
      },
      {
        label: 'Neutral',
        data: sentimentData.neutral, 
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Negative',
        data: sentimentData.negative, 
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
      },
    ],
  };

  return (
    <div className="overall-sentiment-trends">
      <h2>Overall Sentiment Trends</h2>
      <Line data={lineChartData} />
    </div>
  );
};

export default OverallSentimentTrends;
