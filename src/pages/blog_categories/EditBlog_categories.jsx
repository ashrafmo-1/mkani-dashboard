import React, { useState } from 'react';
import { useBlog_categoriesHook } from './hooks/useBlog_categoriesHook';
import { Form, Input, Button, Modal, Select, message } from 'antd';
import { EditFilled } from '@ant-design/icons';

export const EditBlog_categories = ({ blogCategoryId, initialValues }) => {
  const { editBlog_categories } = useBlog_categoriesHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue(initialValues);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (formData) => {
    try {
      setIsPending(true);
      await editBlog_categories(blogCategoryId, formData);
      setIsModalVisible(false);
      message.success("Blog category updated successfully.");
    } catch (error) {
      message.error("Error editing blog category.");
      console.error("Error editing blog category:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <Button onClick={showModal} className='text-green-800'><EditFilled /></Button>

      <Modal title="Edit Blog Category" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Name English" name="nameEn"
            rules={[{ required: true, message: "Name English is required." }]}>
            <Input placeholder="Enter name in English" />
          </Form.Item>

          <Form.Item label="Name Arabic" name="nameAr"
            rules={[{ required: true, message: "Name Arabic is required." }]}>
            <Input placeholder="Enter name in Arabic" />
          </Form.Item>

          <Form.Item label="slug English" name="slugEn"
            rules={[{ required: true, message: "slug English is required." }]}>
            <Input placeholder="Enter slug in English" />
          </Form.Item>

          <Form.Item label="slug Arabic" name="slugAr"
            rules={[{ required: true, message: "slug Arabic is required." }]}>
            <Input placeholder="Enter slug in Arabic" />
          </Form.Item>

          <Form.Item label="is Active" name="isActive"
            rules={[{ required: true, message: "is Active is required." }]}>
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

          <Button type="primary" htmlType="submit" className="w-full" loading={isPending}>
            Save Changes
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
