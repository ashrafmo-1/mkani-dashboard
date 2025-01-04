import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEditCustomerHook } from "./Hooks/useEditCustomerHook";
import { useGetSingleCustomerHook } from "./Hooks/useGetSingleCustomerHook";

export const EditCustomer = ({ customerId }) => {
  const { editCustomers } = useEditCustomerHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data } = useGetSingleCustomerHook(isModalVisible ? customerId : null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await editCustomers(customerId, values);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to edit customer:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        description: data.description,
      });
    }
  }, [data, form]);

  return (
    <div>
      <Button className="edit" onClick={showModal}>
        <EditOutlined />
      </Button>

      <Modal
        title="Edit Customer"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
                label="Email"
                name="email"
                rules={[{ required: true, message: "Email is required." }]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Phone is required." },
              {
                pattern: /^[0-9]+$/,
                message: "Phone number must contain only numbers.",
              },
            ]}
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
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required." }]}
          >
            <Input placeholder="Enter description" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Edit Customer
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
