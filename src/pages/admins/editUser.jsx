import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useEditUserHook } from "./Hooks/useEditUserHook";

export const EditUser = ({ userId, initialValues }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { editUser } = useEditUserHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      await editUser(userId, values);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to edit user:", error);
    }
  };

  return (
    <div>
      <Button
        className="edit border-green-900"
        outline="true"
        onClick={showModal}
      >
        <EditOutlined />
      </Button>
      <Modal title="Edit Admin" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" initialValues={initialValues} onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required." }]}>
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Username" name="username" rules={[{ required: true, message: "Username is required." }]}>
                <Input placeholder="Enter username" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Email" name="email" rules={[
              { required: true, message: "Email is required." },
              { type: "email", message: "Please enter a valid email." },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

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

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Status is required." }]}
              >
                <Select placeholder="Select status">
                  <Select.Option value="1">Active</Select.Option>
                  <Select.Option value="0">Inactive</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Role"
                name="roleId"
                rules={[{ required: true, message: "Role is required." }]}
              >
                <Select placeholder="Select role">
                  <Select.Option value={1}>{"e"}</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required." }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full">
            Edit User
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
