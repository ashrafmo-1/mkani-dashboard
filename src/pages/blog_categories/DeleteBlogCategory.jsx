import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useDeleteBlogCategoryHook } from "./hooks/useDeleteBlogCategoryHook";

export const DeleteBlogCategory = ({blogCategoryId}) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
const {deleteBlogCategory} = useDeleteBlogCategoryHook()
  const handleOk = async () => {
    setLoading(true);
    await deleteBlogCategory(blogCategoryId);
    setLoading(false);
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button danger className="del" onClick={showModal}>
        <DeleteOutlined />
      </Button>

      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
};
