import { EyeFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { usePortfolioSectionHook } from "../hooks/usePortfolioSectionHook";
import { Status } from "../../components/Status";

export const ShowPortfolioSections = ({ frontPageId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: sectionData } = usePortfolioSectionHook(frontPageId);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (!sectionData) {
    return null;
  }

  console.log(sectionData);
  

  return (
    <div>
      <Button onClick={showModal}>
        <EyeFilled />
      </Button>

      <Modal title={sectionData.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="p-4">
          {/* <h2 className="text-2xl font-bold">{sectionData.name}</h2> */}
          <Status value={sectionData.isActive} activeText={"active"} inactiveText={"in active"}  />
          <table className="mt-2 w-full">
            <thead>
              <tr> <th className="text-left">Title</th> </tr>
            </thead>
            <tbody>
              {sectionData.map((content, index) => (
                <tr key={index}>
                  <td className="border-b py-2">{content.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};
