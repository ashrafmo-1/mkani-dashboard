import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const [analyses, setAnalyses] = useState([]);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    // Fetch or generate dashboard analyses data here
    const fetchedAnalyses = [
      { id: 1, title: `${t("dashboard.title")}`, description: 'Overview of sales performance', count: 5 },
      { id: 2, title: 'User Engagement', description: 'Insights into user activity', count: 3 },
      { id: 3, title: 'Market Trends', description: 'Current market trends analysis', count: 8 },
      { id: 4, title: 'Customer Feedback', description: 'Analysis of customer feedback', count: 7 },
      { id: 5, title: 'Inventory Levels', description: 'Current inventory status', count: 4 },
      { id: 6, title: 'Revenue Growth', description: 'Trends in revenue growth', count: 6 },
      { id: 7, title: 'Product Performance', description: 'Performance of products', count: 9 },
      { id: 8, title: 'Operational Efficiency', description: 'Efficiency of operations', count: 2 },
      { id: 9, title: 'Market Share', description: 'Analysis of market share', count: 10 },
      { id: 10, title: 'Cost Analysis', description: 'Breakdown of costs', count: 1 },
    ];
    setAnalyses(fetchedAnalyses);
  }, []);

  const renderIcon = (count) => {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="#f0f0f0" />
        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="black" fontWeight="bold">{count}</text>
      </svg>
    );
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 w-full to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-6">Dashboard Analyses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyses.map(analysis => (
          <div key={analysis.id} className="analysis p-4 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <div className="flex items-center mb-4">
              {renderIcon(analysis.count)}
              <h2 className="text-2xl font-semibold text-gray-800 ml-4">{analysis.title}</h2>
            </div>
            <p className="text-gray-600 mb-2">{analysis.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};