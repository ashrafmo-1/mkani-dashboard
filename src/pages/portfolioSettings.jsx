import React from "react";
import { useTranslation } from "react-i18next";

export const PortfolioSettings = () => {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-x-auto w-full px-10 my-10 pb-2 sm:rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        {t("faqs.title")}
      </h1>
    </div>
  );
};
