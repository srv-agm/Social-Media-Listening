"use client";
import React, { useState } from "react";

interface Keyword {
  id: number;
  value: string;
}

const KeywordInputScreen: React.FC = () => {
  const [keywords, setKeywords] = useState<Keyword[]>([{ id: 1, value: "" }]);

  const addKeyword = () => {
    setKeywords([...keywords, { id: Date.now(), value: "" }]);
  };

  const removeKeyword = (id: number) => {
    setKeywords(keywords.filter((keyword) => keyword.id !== id));
  };

  const handleInputChange = (id: number, value: string) => {
    setKeywords(
      keywords.map((keyword) =>
        keyword.id === id ? { ...keyword, value } : keyword,
      ),
    );
  };

  const handleSubmit = () => {
    console.log(
      "Keywords:",
      keywords.map((keyword) => keyword.value),
    );
    // Add submit logic here
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 p-4">
      {keywords.map((keyword) => (
        <div
          key={keyword.id}
          className="flex w-full items-center justify-center space-x-2"
        >
          <button
            onClick={addKeyword}
            className="rounded bg-gray-200 px-2 py-1 text-lg font-bold"
          >
            +
          </button>
          <button
            onClick={() => removeKeyword(keyword.id)}
            className="rounded bg-gray-200 px-2 py-1 text-lg font-bold"
          >
            -
          </button>
          <input
            type="text"
            placeholder="Enter Keyword"
            value={keyword.value}
            onChange={(e) => handleInputChange(keyword.id, e.target.value)}
            className="w-[50%] text-center rounded border px-2 py-1"
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Submit
      </button>
    </div>
  );
};

export default KeywordInputScreen;
