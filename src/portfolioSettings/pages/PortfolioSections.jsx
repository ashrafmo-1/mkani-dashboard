import React, { useState } from "react";
import { usePortfolioSectionHook } from "../hooks/usePortfolioSectionHook";
import { Status } from "../../components/Status";
import { Button, Modal } from "antd";
import { EyeFilled } from "@ant-design/icons";
import { EditPortfolioSection } from "../components/EditPortfolioSection";

export const PortfolioSections = ({ frontPageId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    data: sectionData,
    isLoading,
    isError,
  } = usePortfolioSectionHook(frontPageId);

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

  if (!Array.isArray(sectionData) || sectionData.length === 0) {
    console.log("sectionData is undefined or empty");
    return (
      <div
        style={{ color: "red", fontWeight: "bold" }}
        className="bg-yellow-300 flex justify-center items-center px-2 rounded-lg"
      >
        {"No sections available"}
      </div>
    );
  }

  return (
    <div>
      <Button
        onClick={showModal}
        style={{ backgroundColor: "green", color: "white" }}
      >
        <EyeFilled /> Show Data
      </Button>

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Sections Details"
        width={800}
      >
        <div className="p-4">
          {sectionData.map((section, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold mb-2">
                  {" "}
                  {section.name || "No Name"}{" "}
                </h2>
                <Status
                  value={section.isActive}
                  activeText={"active"}
                  inactiveText={"inactive"}
                />
              </div>

              <EditPortfolioSection
                frontPageSectionId={section.frontPageSectionId}
              />

              <table className="mt-2 w-full border">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Heading</th>
                    <th className="border px-2 py-1">Description</th>
                    <th className="border px-2 py-1">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(section?.contentEn) &&
                    section.contentEn.map((content, contentIndex) => (
                      <tr key={contentIndex}>
                        <td className="border px-2 py-1">
                          {content.heading || "N/A"}
                        </td>
                        <td className="border px-2 py-1">
                          {content.description || "N/A"}
                        </td>
                        <td className="border px-2 py-1">
                          {content.link || "N/A"}
                        </td>
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
