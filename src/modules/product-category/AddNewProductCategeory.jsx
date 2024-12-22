import { PlusSquareFilled, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { useAddProductCategoryHook } from "./hooks/useAddProductCategoryHook";

export const AddNewProductCategeory = () => {
  const { addProductCategory } = useAddProductCategoryHook();
  const hasCreateUserPermission = checkPermission("create_customer");
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (form_data) => {
    try {
      setIsPending(true);
      await addProductCategory(form_data);
      message.success("Product added successfully.");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Failed to send form. Please try again.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      {hasCreateUserPermission && (
        <Button onClick={showModal}>
          <PlusSquareFilled />
          {"add new product"}
        </Button>
      )}

      <Modal
        title="Add New product"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
        // width={1440}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="name english"
                name="nameEn"
                rules={[
                  { required: true, message: "name english is required." },
                ]}
              >
                <Input placeholder="Enter name english" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="name arabic"
                name="nameAr"
                rules={[
                  { required: true, message: "name arabic is required." },
                ]}
              >
                <Input placeholder="Enter name arabic" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="is active"
            name="isActive"
            rules={[{ required: true, message: "is active is required." }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="1">done</Select.Option>
              <Select.Option value="0">no</Select.Option>
            </Select>
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Thumbnail"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
                rules={[{ required: true, message: "Thumbnail is required." }]}
              >
                <Upload listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            {"Add New Product"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
