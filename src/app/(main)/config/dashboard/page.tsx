"use client";
import MentionsByPlatform from "../../component/graph1";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">
      <MentionsByPlatform/>
      <MentionsByPlatform/>
      <MentionsByPlatform/>
      </h1>
      <div className="grid gap-4">
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
}
// dashboard changes here 