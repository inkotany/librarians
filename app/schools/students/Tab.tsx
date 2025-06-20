"use client";
import React, { useState } from "react";

const TabButton = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-300 ease-in-out focus:outline-none ${
      isActive
        ? "bg-primary text-white"
        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-primary/80 hover:text-white"
    }`}
  >
    {label}
  </button>
);

const Tabs = ({ tabLabels, tabComponents }: { tabLabels: string[]; tabComponents: React.ReactNode[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
      <div className="flex border-b border-gray-300 dark:border-gray-700">
        {tabLabels.map((label, index) => (
          <TabButton
            key={index}
            label={label}
            isActive={activeTab === index}
            onClick={() => handleTabClick(index)}
          />
        ))}
      </div>
      <div className="mt-4">{tabComponents[activeTab]}</div>
    </div>
  );
};

export default Tabs;
