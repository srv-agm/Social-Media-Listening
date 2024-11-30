"use client";
import React, { useState } from "react";
import { toast } from "sonner";

interface ConfigRow {
  id: number;
  keyword: string;
  brand: string;
}

export default function KeywordPage() {
  const [rows, setRows] = useState<ConfigRow[]>([
    { id: 1, keyword: "", brand: "" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addRow = () => {
    setRows([...rows, { id: Date.now(), keyword: "", brand: "" }]);
    setError(null);
  };

  const removeRow = (id: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id));
      setError(null);
    }
  };

  const handleInputChange = (id: number, field: 'keyword' | 'brand', value: string) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, [field]: value.trim() } : row,
      ),
    );
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Validation
      const emptyFields = rows.some((row) => !row.keyword || !row.brand);
      if (emptyFields) {
        throw new Error("Please fill in all fields");
      }

      // Format the payload as per API requirements
      const payload = rows.map(row => ({
        brand: row.brand,
        keywords: row.keyword
      }));

      const response = await fetch('https://socialdots-api.mfilterit.net/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      toast.success('Configuration saved successfully');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Configuration</h1>
      
      <div className="mb-8">
        {/* Header */}
        <div className="mb-4 grid grid-cols-[auto_1fr_1fr] gap-4 items-center">
          <div className="w-20"></div>
          <h2 className="text-xl font-semibold">Keyword</h2>
          <h2 className="text-xl font-semibold">Brand</h2>
        </div>

        {/* Rows */}
        <div className="flex flex-col space-y-4">
          {rows.map((row) => (
            <div key={row.id} className="grid grid-cols-[auto_1fr_1fr] gap-4 items-center">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addRow}
                  className="rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600 disabled:opacity-50"
                  disabled={rows.length === 1 || isSubmitting}
                >
                  -
                </button>
              </div>
              <input
                type="text"
                value={row.keyword}
                onChange={(e) => handleInputChange(row.id, 'keyword', e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
                placeholder="Enter keyword"
                disabled={isSubmitting}
              />
              <input
                type="text"
                value={row.brand}
                onChange={(e) => handleInputChange(row.id, 'brand', e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-1 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
                placeholder="Enter brand name"
                disabled={isSubmitting}
              />
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
      
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
