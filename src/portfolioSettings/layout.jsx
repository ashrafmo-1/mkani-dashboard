import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";
import { PortfolioPages } from "./pages/PortfolioPages";

export const Layout = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        {t("siteSettings.title")}
      </h1>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: t("siteSettings.portfolioPages"),
            key: "1",
            children: <PortfolioPages />,
          }
        ]}
      />
    </>
  );
};