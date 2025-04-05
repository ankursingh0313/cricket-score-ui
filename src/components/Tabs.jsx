// components/Tabs.js
import React from "react";

export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = ["live", "upcoming", "recent"];

  return (
    <div className="flex space-x-4 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors duration-200 ${
            activeTab === tab
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
