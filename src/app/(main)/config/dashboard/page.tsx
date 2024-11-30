"use client";
import { useEffect, useState } from "react";
import MentionsByPlatform from "../../component/graph1";
import OverallSentimentTrends from "../../component/graph2";
import TotalBrandMentions from "../../component/graph4";
import PieChart from "../../component/overall";
import dynamic from 'next/dynamic';
import SyncedChartTable from "../../component/productspecific";
import DailyMentionsTrend from "../../component/DailyMentionsTrend";

// Dynamically import HeatmapWithPopup with ssr disabled
const HeatmapWithPopup = dynamic(
  () => import('../../component/heatmap'),
  { ssr: false }
);

// const platformData = [50, 75, 100, 25, 60];
const sentimentData = {
  positive: [10, 20, 30, 40, 50, 60, 70],
  neutral: [5, 15, 25, 35, 45, 55, 65],
  negative: [2, 12, 22, 32, 42, 52, 62],
};

export default function DashboardPage() {
  const [mentionsData, setMentionsData] = useState({
    totalMentions: "0",
    growthPercentage: 0,
    dailyMentionsData: [0, 0, 0, 0, 0, 0, 0],
  });

  // Add new state for sentiment data
  const [sentimentData, setSentimentData] = useState({
    negative: 0,
    neutral: 0,
    positive: 0,
  });

  // Add new state for sentiment trend data
  const [sentimentTrendData, setSentimentTrendData] = useState({
    negative: [0, 0, 0, 0, 0, 0, 0],
    neutral: [0, 0, 0, 0, 0, 0, 0],
    positive: [0, 0, 0, 0, 0, 0, 0]
  });

  // Add state for brand and keyword
  const [brandKeyword, setBrandKeyword] = useState({
    brand: '',
    keyword: ''
  });

  // Add new state for platform mentions
  const [platformData, setPlatformData] = useState({
    mentions: [],
    platforms: []
  });

  useEffect(() => {
    // Get stored values
    const storedBrand = localStorage.getItem('selectedBrand');
    const storedKeyword = localStorage.getItem('selectedKeyword');

    // If no stored values, redirect to config page
    if (!storedBrand || !storedKeyword) {
      window.location.href = '/config/keyword';
      return;
    }

    setBrandKeyword({
      brand: storedBrand,
      keyword: storedKeyword
    });
  }, []);

  useEffect(() => {
    // Only fetch if we have brand and keyword
    if (!brandKeyword.brand || !brandKeyword.keyword) return;

    const fetchMentionsData = async () => {
      try {
        const response = await fetch("https://socialdots-api.mfilterit.net/mentions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            brand: brandKeyword.brand,
            keyword: brandKeyword.keyword,
          }),
        });

        const data = await response.json();
        setMentionsData(data);
      } catch (error) {
        console.error("Error fetching mentions data:", error);
      }
    };

    const fetchSentimentData = async () => {
      try {
        const response = await fetch("https://socialdots-api.mfilterit.net/sentiments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            brand: brandKeyword.brand,
            keyword: brandKeyword.keyword,
          }),
        });

        const data = await response.json();
        setSentimentData(data.sentiments);
      } catch (error) {
        console.error("Error fetching sentiment data:", error);
      }
    };

    const fetchSentimentTrendData = async () => {
      try {
        const response = await fetch('https://socialdots-api.mfilterit.net/sentiment_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            brand: brandKeyword.brand,
            keyword: brandKeyword.keyword,
          })
        });
        
        const data = await response.json();
        setSentimentTrendData(data.sentimentData);
      } catch (error) {
        console.error('Error fetching sentiment trend data:', error);
      }
    };

    const fetchPlatformMentions = async () => {
      try {
        const response = await fetch('https://socialdots-api.mfilterit.net/platform_mentions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            brand: brandKeyword.brand,
            keyword: brandKeyword.keyword,
          })
        });
        
        const data = await response.json();
        setPlatformData(data);
      } catch (error) {
        console.error('Error fetching platform mentions:', error);
      }
    };

    // Fetch all data
    Promise.all([
      fetchMentionsData(),
      fetchSentimentData(),
      fetchSentimentTrendData(),
      fetchPlatformMentions()
    ]);
  }, [brandKeyword]); // Dependency on brandKeyword

  return (
    <div className="container mt-4">
      {/* First row with 3 graphs */}
      <div className="grid grid-cols-3 gap-4">
        <div className="h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          <TotalBrandMentions
            totalMentions={parseInt(mentionsData.totalMentions)}
            growthPercentage={mentionsData.growthPercentage}
            dailyMentionsData={mentionsData.dailyMentionsData.map(Number)}
          />
        </div>
        <div className="flex h-[400px] w-full items-center justify-center rounded-lg bg-white p-4 shadow-sm">
          <PieChart sentimentData={sentimentData} />
        </div>
        <div className="h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          <OverallSentimentTrends sentimentData={sentimentTrendData} />
        </div>
      </div>
      <hr />
      <hr />
      <hr />
      <hr />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          <MentionsByPlatform platformData={platformData} />
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
          <HeatmapWithPopup />
        </div>
      </div>
      <div className="map-container h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
        <SyncedChartTable />
      </div>
    </div>
  );
}
