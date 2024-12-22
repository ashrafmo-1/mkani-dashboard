import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal, Select, message } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useGetBlogCategoryHook } from "./hooks/useGetBlogCategoryHook";
import { useEditBolgCategoryHook } from "./hooks/useEditBolgCategoryHook";

export const EditBlogCategories = ({ blogCategoryId }) => {
  const { editUser} = useEditBolgCategoryHook()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  const { data } = useGetBlogCategoryHook(blogCategoryId);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (formData) => {
    console.log("Form Data Submitted:", formData); // Debugging log
    try {
      setIsPending(true);
      await editUser(blogCategoryId, formData);
      setIsModalVisible(false);
      message.success("Blog category updated successfully.");
    } catch (error) {
      message.error("Error editing blog category.");
      console.error("Error editing blog category:", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        nameEn: data?.nameEn || "",
        nameAr: data?.nameAr || "",
        slugAr: data?.slugAr || "",
        slugEn: data?.slugEn || "",
        isActive: data?.isActive !== undefined ? String(data.isActive) : "",
      });
    }
  }, [data, form, isModalVisible]);

  return (
    <div>
      <Button onClick={showModal} className="text-green-800">
        <EditFilled />
      </Button>

      <Modal
        title="Edit Blog Category"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Name English"
            name="nameEn"
            rules={[{ required: true, message: "Name English is required." }]}
          >
            <Input placeholder="Enter name in English" />
          </Form.Item>

          <Form.Item
            label="Name Arabic"
            name="nameAr"
            rules={[{ required: true, message: "Name Arabic is required." }]}
          >
            <Input placeholder="Enter name in Arabic" />
          </Form.Item>

          <Form.Item
            label="Slug English"
            name="slugEn"
            rules={[{ required: true, message: "Slug English is required." }]}
          >
            <Input placeholder="Enter slug in English" />
          </Form.Item>

          <Form.Item
            label="Slug Arabic"
            name="slugAr"
            rules={[{ required: true, message: "Slug Arabic is required." }]}
          >
            <Input placeholder="Enter slug in Arabic" />
          </Form.Item>

          <Form.Item
            label="Is Active"
            name="isActive"
            rules={[{ required: true, message: "Is Active is required." }]}
          >
            <Select placeholder="Select is Active" aria-label="isActive">
              <Select.Option value="1">
                <div className="flex items-center gap-1">
                  <span className="bg-green-600 p-2 rounded-full"></span>
                  <span>Active</span>
                </div>
              </Select.Option>
              <Select.Option value="0">
                <div className="flex items-center gap-1">
                  <span className="bg-red-600 p-2 rounded-full"></span>
                  <span>Inactive</span>
                </div>
              </Select.Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            Save Changes
          </Button>
        </Form>
      </Modal>
    </div>
  );
};