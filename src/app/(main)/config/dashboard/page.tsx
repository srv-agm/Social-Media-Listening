"use client";
import MentionsByPlatform from "../../component/graph1";
import OverallSentimentTrends from "../../component/graph2";
import TotalBrandMentions from "../../component/graph4";
import ProductData from "../../component/graph3";
import DailyMentionsTrend from "../../component/DailyMentionsTrend";

const platformData = [50, 75, 100, 25, 60];
const sentimentData = {
  positive: [10, 20, 30, 40, 50, 60, 70],
  neutral: [5, 15, 25, 35, 45, 55, 65],
  negative: [2, 12, 22, 32, 42, 52, 62],
};

const totalMentions = 24560;
const growthPercentage = 15;
const dailyMentionsData = [3000, 2000, 1000, 1500, 2000, 3500, 4000];

export default function DashboardPage() {
  return (
    <div className="container mt-4">
<<<<<<< Updated upstream
      {/* <h1 className="mb-4 text-center text-3xl font-bold">Dashboard</h1> */}
      <div className="col-md-6">
        <TotalBrandMentions
          totalMentions={totalMentions}
          growthPercentage={growthPercentage}
          dailyMentionsData={dailyMentionsData}
        />
=======
      {/* First row with 3 graphs */}
      <div className="grid grid-cols-3 gap-4">
        <div className="h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          <TotalBrandMentions
            totalMentions={totalMentions}
            growthPercentage={growthPercentage}
            dailyMentionsData={dailyMentionsData}
          />
        </div>
        <div className="flex h-[400px] w-full items-center justify-center rounded-lg bg-white p-4 shadow-sm">
          <PieChart />
        </div>
        <div className="h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          <OverallSentimentTrends sentimentData={sentimentData} />
        </div>
      </div>
      <hr />
      <hr />
      <hr />
      <hr />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          <MentionsByPlatform />
        </div>
        <div className="h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          <DailyMentionsTrend />
        </div>
      </div>
      <hr />
      <hr />
      <hr />
      <hr />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          {/* <MentionsByPlatform /> */}
          <HeatmapWithPopup />
        </div>
        {/* <div className="w-full h-[400px] bg-white rounded-lg shadow-sm p-4">
          <DailyMentionsTrend />
        </div> */}
      </div>
      <div className="map-container h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
        {/* <MentionsByPlatform /> */}
        {/* <ProductSpecificMentions /> */}
        <SyncedChartTable />
>>>>>>> Stashed changes
      </div>


    </div>
  );
}
