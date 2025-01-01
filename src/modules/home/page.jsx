import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">{t("Home.title")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    </div>
  );
};
