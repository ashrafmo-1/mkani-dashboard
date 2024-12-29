import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";
import { PortfolioPages } from "./pages/PortfolioPages";
const { TabPane } = Tabs;

export const Layout = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        {t("siteSettings.title")}
      </h1>

      <Tabs defaultActiveKey="1">
        <TabPane tab={t("Portfolio pages")} key="1">
          <PortfolioPages />
        </TabPane>
      </Tabs>
    </>
  );
};