import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const [analyses, setAnalyses] = useState([]);
  const { i18n, t } = useTranslation();

  const renderIcon = (count) => {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="#f0f0f0" />
        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="black" fontWeight="bold">{count}</text>
      </svg>
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">{t("Home.title")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      </div>
    </div>
  );
};