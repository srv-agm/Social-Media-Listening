"use client";
import MentionsByPlatform from "../../component/graph1";
import OverallSentimentTrends from "../../component/graph2";

const sentimentData = {
  positive: [10, 20, 30, 40, 50, 60, 70], // Example data
  neutral: [5, 15, 25, 35, 45, 55, 65],
  negative: [2, 12, 22, 32, 42, 52, 62],
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">
        <MentionsByPlatform />
        <OverallSentimentTrends sentimentData={sentimentData} />
        {/* <MentionsByPlatform />
        <MentionsByPlatform /> */}
      </h1>
      <div className="grid gap-4">
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
}
// dashboard changes here 