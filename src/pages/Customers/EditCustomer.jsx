import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEditCustomerHook } from "./Hooks/useEditCustomerHook";

export const EditCustomer = ({ customerId, initialValues }) => {
  const { editCustomers } = useEditCustomerHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalVisible) {
      form.setFieldsValue(initialValues);
    }
  }, [isModalVisible, initialValues, form]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      await editCustomers(customerId, values);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to edit user:", error);
    }
  };

  return (
    <div>
      <Button className="edit" onClick={showModal}>
        <EditOutlined />
      </Button>

      <Modal
        title="Edit Admin"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Name is required." }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="email"
                name="email"
                rules={[{ required: true, message: "email is required." }]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>

          {/* Phone */}
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Phone is required." }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Address is required." }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>

          <Form.Item
            label="description"
            name="description"
            rules={[
              { required: true, message: "description is required." },
              {
                type: "description",
                message: "Please enter a valid description.",
              },
            ]}
          >
            <Input placeholder="Enter description" />
          </Form.Item>

          {/* Submit Button */}
          <Button type="primary" htmlType="submit" className="w-full">
            Edit User
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
