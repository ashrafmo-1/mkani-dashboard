import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useDeletePageHook } from "../hooks/useDeletePageHook";

export const DeletePagePortfolio = ({frontPageId}) => {
  const { deletePortfolioPage } = useDeletePageHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  
  return (
    <div>
      <Button danger className="del" onClick={() => setIsModalVisible(frontPageId)}>
        <DeleteOutlined />
      </Button>
      <Modal title="Confirm Deletion" visible={isModalVisible === frontPageId}
        onOk={async () => {
          setIsPending(true);
          await deletePortfolioPage(frontPageId);
          setIsPending(false);
          setIsModalVisible(null);
        }}
        onCancel={() => setIsModalVisible(null)} confirmLoading={isPending}
      >
        <p>{"you need delete this page?"}</p>
      </Modal>
    </div>
  );
};
