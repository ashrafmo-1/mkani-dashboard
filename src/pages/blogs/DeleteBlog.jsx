import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useBlogHook } from "./hooks/useBlogHook";

export const DeleteBlog = ({ BlogId }) => {
  const { deleteBlogs } = useBlogHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  
  return (
    <div>
      <Button danger className="del" onClick={() => setIsModalVisible(BlogId)}>
        <DeleteOutlined />
      </Button>
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible === BlogId}
        onOk={async () => {
          setIsPending(true);
          await deleteBlogs(BlogId);
          setIsPending(false);
          setIsModalVisible(null);
        }}
        onCancel={() => setIsModalVisible(null)} confirmLoading={isPending}
      >
        <p>Are you sure you want to delete this blog?</p>
      </Modal>
    </div>
  );
};
