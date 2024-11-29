"use client";
import React, { useState } from "react";

interface Keyword {
  id: number;
  value: string;
}

export default function KeywordPage() {
  const [keywords, setKeywords] = useState<Keyword[]>([{ id: 1, value: "" }]);

  const addKeyword = () => {
    setKeywords([...keywords, { id: Date.now(), value: "" }]);
  };

  const removeKeyword = (id: number) => {
    if (keywords.length > 1) {
      setKeywords(keywords.filter((keyword) => keyword.id !== id));
    }
  };

  const handleInputChange = (id: number, value: string) => {
    setKeywords(
      keywords.map((keyword) =>
        keyword.id === id ? { ...keyword, value } : keyword,
      ),
    );
  };

  const handleSubmit = () => {
    const values = keywords.map((keyword) => keyword.value);
    console.log("Keywords:", values);
    // Add submit logic here
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        {keywords.map((keyword) => (
          <div key={keyword.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={addKeyword}
              className="rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => removeKeyword(keyword.id)}
              className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              disabled={keywords.length === 1}
            >
              -
            </button>
            <input
              type="text"
              value={keyword.value}
              onChange={(e) => handleInputChange(keyword.id, e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none"
              placeholder="Enter keyword"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
