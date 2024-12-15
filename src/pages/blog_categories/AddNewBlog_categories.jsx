import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { useBlog_categoriesHook } from "./hooks/useBlog_categoriesHook";

export const AddNewBlog_categories = () => {
  const hasCreateCategoryPermission = checkPermission("create_blog_category");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  const { addBlog_categories } = useBlog_categoriesHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (formData) => {
    try {
      setIsPending(true);
      await addBlog_categories(formData);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.status) {
        message.error("The selected status is invalid.");
      } else {
        console.error("Error adding blog category:", error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      {/* {hasCreateCategoryPermission && ()} */}
      <Button onClick={showModal}>Add New Blog Category</Button>

      <Modal title="Add New Blog Category" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Name English" name="nameEn"
                rules={[
                  { required: true, message: "Name English is required." },
                ]}
              >
                <Input placeholder="Enter name in English" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Name Arabic" name="nameAr"
                rules={[
                  { required: true, message: "Name Arabic is required." },
                ]}
              >
                <Input placeholder="Enter name in Arabic" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="slug English" name="slugEn"
                rules={[ { required: true, message: "slug English is required." } ]}>
                <Input placeholder="Enter slug in English" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="slug Arabic" name="slugAr"
                rules={[ { required: true, message: "slug Arabic is required." } ]}
              >
                <Input placeholder="Enter slug in Arabic" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="is Active" name="isActive"
            rules={[{ required: true, message: "is Active is required." }]}
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

          {/* Submit Button */}
          <Button type="primary" htmlType="submit" className="w-full" loading={isPending}>
            Add New Blog Category
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
