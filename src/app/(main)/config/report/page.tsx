"use client";
import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
import ResizableTable from "@/components/mf/TableComponent";

interface ResponseData {
  data: any[];
}

const columns: any[] = [
  { title: "Brand", key: "brand" },
  { title: "Name", key: "name" },
  { title: "Username", key: "user_name" },
  { title: "Platform", key: "platform" },
  { title: "Category", key: "post_category" },
  { title: "Sentiment", key: "post_sentiment" },
  {
    title: "Post Date",
    key: "post_date",
    render: (data: any) => new Date(data.post_date).toLocaleString(),
  },
  {
    title: "Description",
    key: "post_description",
    render: (data: any) => (
      <div className="max-w-md truncate">{data.post_description}</div>
    ),
  },
  {
    title: "Post URL",
    key: "post_url",
    render: (data: any) => (
      <a
        href={data.post_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        🔗
      </a>
    ),
  },
];
const Secondcolumns: any[] = [
  { title: "Brand", key: "brand" },
  { title: "Name", key: "name" },
  { title: "Comment Category", key: "comment_category" },
  { title: "Comment Datetime", key: "comment_datetime" },
  { title: "Comment Sentiment", key: "comment_sentiment" },
  { title: "Comments", key: "comments" },
  { title: "Hashtags", key: "hashtags" },
  { title: "Inserted Date", key: "inserted_date" },
  { title: "Keyword", key: "keyword" },
  { title: "Platform", key: "platform" },
  // { title: "Post Url", key: "post_url" },
  {
    title: "Post URL",
    key: "post_url",
    render: (data: any) => (
      <a
        href={data.post_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        🔗
      </a>
    ),
  },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [secondresponseData, secondsetResponseData] =
    useState<ResponseData | null>(null);

  console.log(responseData, "ajdskajsdkajsbdkjabs");

  // Add useEffect to fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://socialdots-api.mfilterit.net/api/fetch_post_details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              brand: "orange",
              keyword: "orange",
            }),
          },
        );

        if (response.ok) {
          const data = await response.json();
          setResponseData(data);
          console.log("API Response:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const secondfetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://socialdots-api.mfilterit.net/api/fetch_comment_details",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              brand: "orange",
              keyword: "orange",
            }),
          },
        );

        if (response.ok) {
          const data = await response.json();
          secondsetResponseData(data);
          console.log("API Response:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    secondfetchData();
  }, []);

  return (
    <>
      <div className="mt-4 rounded border bg-gray-100 p-4">
        <h2 className="mb-4 text-center text-xl font-semibold">
          Social Media Posts
        </h2>
        <ResizableTable
          columns={columns}
          data={responseData?.data ?? []}
          isLoading={loading}
          headerColor="#DCDCDC"
          isSearchable
          isSelectable
        />
      </div>
      {/* <div className="mt-4 rounded border bg-gray-100 p-4">
        <h2 className="mb-4 text-center text-xl font-semibold">
          Social Media Comments
        </h2>
        <ResizableTable
          columns={Secondcolumns}
          data={secondresponseData?.data ?? []}
          isLoading={loading}
          headerColor="#DCDCDC"
          isSearchable
          isSelectable
        />
      </div> */}
    </>
  );
}
