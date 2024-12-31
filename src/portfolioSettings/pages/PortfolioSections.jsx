import React, { useState } from "react";
import { usePortfolioSectionHook } from "../hooks/usePortfolioSectionHook";
import { Status } from "../../components/Status";
import { Button, Modal } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const PortfolioSections = ({ frontPageId }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {data: sectionData, isLoading, isError } = usePortfolioSectionHook(frontPageId);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error loading data");
    return <div>Error loading data.</div>;
  }

  if (!sectionData || !Array.isArray(sectionData) || sectionData.length === 0) {
    return (
      <div className="bg-red-500 text-white font-[500] shadow flex justify-center items-center px-2 rounded-lg">
        {"No sections available"}
      </div>
    );
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        <EyeFilled /> {t("siteSettings.showData")}
      </Button>

      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={800} bodyStyle={{ padding: "20px" }}
        title={<h3 className="text-lg font-semibold">Sections Details</h3>}
      >
        <div className="p-4">
          {sectionData.map((section, index) => (
            <div key={index} className="mb-6 border-b pb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {section.name || "No Name"}
                  </h2>
                  <Status
                    value={section.isActive}
                    activeText={"active"}
                    inactiveText={"inactive"}
                  />
                </div>
              </div>

              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    {Array.isArray(section?.contentEn) && section.contentEn.length > 0 &&
                      Object.keys(section.contentEn[0]).map((key) => (
                        <th key={key} className="border px-4 py-2 text-left text-sm font-medium text-gray-600">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(section?.contentEn) && section.contentEn.map((content, contentIndex) => (
                      <tr key={contentIndex} className={`${contentIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                        {Object.keys(content).map((key) => (
                          <td key={key} className="border px-4 py-2 text-sm text-gray-700">
                            {typeof content[key] === 'object' ? JSON.stringify(content[key]) : content[key] || "N/A"}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};