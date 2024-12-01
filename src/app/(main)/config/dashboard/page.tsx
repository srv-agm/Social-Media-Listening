"use client";
import { useEffect, useState } from "react";
import MentionsByPlatform from "../../component/graph1";
import ProductMentionsChart from "../../component/productspecific";
import OverallSentimentTrends from "../../component/graph2";
import TotalBrandMentions from "../../component/graph4";
import PieChart from "../../component/overall";
import dynamic from "next/dynamic";
// import SyncedChartTable from "../../component/productspecific";
import DailyMentionsTrend from "../../component/DailyMentionsTrend";
import CrisisMonitoringChart from "../../component/crisisMonitoring";
import { InfoIcon } from "lucide-react";

// Dynamically import HeatmapWithPopup with ssr disabled
const HeatmapWithPopup = dynamic(() => import("../../component/heatmap"), {
  ssr: false,
});

// const platformData = [50, 75, 100, 25, 60];
const sentimentData = {
  positive: [10, 20, 30, 40, 50, 60, 70],
  neutral: [5, 15, 25, 35, 45, 55, 65],
  negative: [2, 12, 22, 32, 42, 52, 62],
};

const InfoTooltip = ({ text }: { text: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <InfoIcon className="h-5 w-5 cursor-help text-gray-400" />
      {isVisible && (
        <div className="absolute right-0 top-6 z-50 w-64 rounded-md bg-gray-800 p-2 text-sm text-white shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
};

export default function DashboardPage() {
  const data = [
    { product: "Product A", positive: 5000, negative: 2500 },
    { product: "Product B", positive: 3000, negative: 500 },
    { product: "Product C", positive: 2000, negative: 10000 },
    { product: "Product D", positive: 4000, negative: 3000 },
    { product: "Product E", positive: 1500, negative: 4000 },
  ];

  const dataCrisis = [
    { day: "Mon", mentions: 300 },
    { day: "Tue", mentions: 200 },
    { day: "Wed", mentions: 400 },
    { day: "Thu", mentions: 250 },
    { day: "Fri", mentions: 600 },
    { day: "Sat", mentions: 350 },
    { day: "Sun", mentions: 450 },
  ];
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
    positive: [0, 0, 0, 0, 0, 0, 0],
  });

  // Add state for brand and keyword
  const [brandKeyword, setBrandKeyword] = useState({
    brand: "",
    keyword: "",
  });

  // Add new state for platform mentions
  const [platformData, setPlatformData] = useState({
    mentions: [],
    platforms: [],
    categories: ['Posts', 'Comments', 'Shares']
  });

  // Add new state for product category data
  const [productCategoryData, setProductCategoryData] = useState([]);

  // Add new state for chart data
  const [chartData, setChartData] = useState({
    datasets: [],
    labels: []
  });

  // Add new state for crisis data
  const [crisisData, setCrisisData] = useState([]);

  useEffect(() => {
    // Get stored values
    const storedBrand = localStorage.getItem("selectedBrand");
    const storedKeyword = localStorage.getItem("selectedKeyword");

    // If no stored values, redirect to config page
    if (!storedBrand || !storedKeyword) {
      window.location.href = "/config/keyword";
      return;
    }

    setBrandKeyword({
      brand: storedBrand,
      keyword: storedKeyword,
    });
  }, []);

  useEffect(() => {
    // Only fetch if we have brand and keyword
    if (!brandKeyword.brand || !brandKeyword.keyword) return;

    const fetchMentionsData = async () => {
      try {
        const response = await fetch(
          "https://socialdots-api.mfilterit.net/mentions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              brand: brandKeyword.brand,
              keyword: brandKeyword.keyword,
            }),
          },
        );

        const data = await response.json();
        setMentionsData(data);
      } catch (error) {
        console.error("Error fetching mentions data:", error);
      }
    };

    const fetchSentimentData = async () => {
      try {
        const response = await fetch(
          "https://socialdots-api.mfilterit.net/sentiments",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              brand: brandKeyword.brand,
              keyword: brandKeyword.keyword,
            }),
          },
        );

        const data = await response.json();
        setSentimentData(data.sentiments);
      } catch (error) {
        console.error("Error fetching sentiment data:", error);
      }
    };

    const fetchSentimentTrendData = async () => {
      try {
        const response = await fetch(
          "https://socialdots-api.mfilterit.net/sentiment_data",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              brand: brandKeyword.brand,
              keyword: brandKeyword.keyword,
            }),
          },
        );

        const data = await response.json();
        setSentimentTrendData(data.sentimentData);
      } catch (error) {
        console.error("Error fetching sentiment trend data:", error);
      }
    };

    const fetchPlatformMentions = async () => {
      try {
        const response = await fetch(
          "https://socialdots-api.mfilterit.net/platform_mentions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              brand: brandKeyword.brand,
              keyword: brandKeyword.keyword,
            }),
          },
        );

        const data = await response.json();
        setPlatformData(data);
      } catch (error) {
        console.error("Error fetching platform mentions:", error);
      }
    };

    const fetchProductCategoryData = async () => {
      try {
        const response = await fetch(
          "https://socialdots-api.mfilterit.net/api/post_category",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              brand: brandKeyword.brand,
              keyword: brandKeyword.keyword,
            }),
          },
        );

        const data = await response.json();
        setProductCategoryData(data.data);
      } catch (error) {
        console.error("Error fetching product category data:", error);
      }
    };

    const fetchChartData = async () => {
      try {
        const response = await fetch(
          "https://socialdots-api.mfilterit.net/api/chart_data",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              brand: brandKeyword.brand,
              keyword: brandKeyword.keyword,
            }),
          }
        );

        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    const fetchCrisisData = async () => {
      try {
        const response = await fetch(
          "https://socialdots-api.mfilterit.net/api/negative_mentions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              brand: brandKeyword.brand,
              keyword: brandKeyword.keyword,
            }),
          }
        );

        const data = await response.json();
        setCrisisData(data.data);
      } catch (error) {
        console.error("Error fetching crisis data:", error);
      }
    };

    // Update Promise.all to include new fetch
    Promise.all([
      fetchMentionsData(),
      fetchSentimentData(),
      fetchSentimentTrendData(),
      fetchPlatformMentions(),
      fetchProductCategoryData(),
      fetchChartData(),
      fetchCrisisData(),
    ]);
  }, [brandKeyword]);

  return (
    <div className="container mt-4">
      {/* First row with 3 graphs */}
      <div className="mb-10 grid grid-cols-3 gap-4">
        <div className="relative h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          <div className="absolute right-2 top-2">
            <InfoTooltip text="Total number of times the brand is mentioned online" />
          </div>
          <TotalBrandMentions
            totalMentions={parseInt(mentionsData.totalMentions)}
            growthPercentage={mentionsData.growthPercentage}
            dailyMentionsData={mentionsData.dailyMentionsData.map(Number)}
          />
        </div>
        <div className="relative flex h-[400px] w-full items-center justify-center rounded-lg bg-white p-4 shadow-sm">
          <div className="absolute right-2 top-2">
            <InfoTooltip text="Percentage of positive, negative, and neutral mentions" />
          </div>
          <PieChart sentimentData={sentimentData} />
        </div>
        <div className="relative h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          <div className="absolute right-2 top-2">
            <InfoTooltip text="Daily shifts in positive, negative, and neutral sentiments" />
          </div>
          <OverallSentimentTrends sentimentData={sentimentTrendData} />
        </div>
      </div>

      {/* Second row with 2 graphs */}
      <div className="mb-10 grid grid-cols-2 gap-4">
        <div className="relative h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          <div className="absolute right-2 top-2">
            <InfoTooltip text="Breakdown of mentions across social media platforms" />
          </div>
          <MentionsByPlatform platformData={platformData} />
        </div>
        <div className="relative h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          <div className="absolute right-2 top-2">
            <InfoTooltip text="Day-wise trends in brand mentions" />
          </div>
          <DailyMentionsTrend data={chartData} />
        </div>
      </div>
      <div className="mb-10 grid grid-cols-2 gap-4">
        <div className="relative h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          <div className="absolute right-2 top-2">
            <InfoTooltip text="Group posts into categories like reviews or complaints" />
          </div>
          <ProductMentionsChart data={productCategoryData} />
        </div>
        <div className="relative h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          <div className="absolute right-2 top-2">
            <InfoTooltip text="Watches for repeated keywords that might indicate a problem" />
          </div>
          <CrisisMonitoringChart data={crisisData} />
        </div>
      </div>
      <div className="mb-10 w-full">
        <div className="relative h-[400px] w-full rounded-lg bg-white p-4 shadow-sm">
          <div className="absolute right-2 top-2">
            <InfoTooltip text="Areas where the brand is getting the most attention" />
          </div>
          <HeatmapWithPopup />
        </div>
      </div>
    </div>
  );
}
