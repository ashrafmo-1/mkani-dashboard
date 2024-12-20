import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { Modal, Button, Form, Input, Col, Select, Row, message } from "antd";
import { useUsersHook } from "./Hooks/useUsersHook";
import { useSelectsHook } from "../../Hooks/useSelectsHook";
import { PlusSquareFilled } from "@ant-design/icons";
import { useAddUserHook } from "./Hooks/useAddUserHook";

export const AddNewUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const hasCreateUserPermission = checkPermission("create_user");
  const { addNewUser } = useAddUserHook();
  const { type } = useSelectsHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // إعادة تعيين الحقول عند إغلاق المودال
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await addNewUser(formData);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.status) {
        message.error("The selected status is invalid.");
      } else {
        console.error("Error adding user:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {hasCreateUserPermission ? (
        <>
          <Button className="" onClick={showModal}>
            <PlusSquareFilled />
            {"Add New Admin"}
          </Button>

          <Modal title="Add New Admin" visible={isModalVisible} onCancel={handleCancel} footer={null}>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Row gutter={[16, 16]}>
                {/* Name */}
                <Col span={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Name is required." }]}
                  >
                    <Input placeholder="Enter name" />
                  </Form.Item>
                </Col>

                {/* Username */}
                <Col span={12}>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: "Username is required." }]}>
                    <Input placeholder="Enter username" />
                  </Form.Item>
                </Col>
              </Row>

              {/* Email */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email is required." },
                  { type: "email", message: "Please enter a valid email." },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>

              {/* Phone */}
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: "Phone is required." }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>

              {/* Address */}
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Address is required." }]}
              >
                <Input placeholder="Enter address" />
              </Form.Item>

              <Row gutter={[16, 16]}>
                {/* Status */}
                <Col span={12}>
                  <Form.Item label="Status" name="status" rules={[{ required: true, message: "Status is required." }]}>
                    <Select placeholder="Select status">
                      <Select.Option value="1">Active</Select.Option>
                      <Select.Option value="0">Inactive</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                {/* Role */}
                <Col span={12}>
                  <Form.Item label="Role" name="roleId" rules={[{ required: true, message: "Role is required." }]}>
                    {/* <Input placeholder="Enter role" /> */}
                    <Select placeholder="Select role">
                      {type.map((item) => (
                        <Select.Option value={item.value}>{item.label}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* Password */}
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required." }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>

              {/* Submit Button */}
              <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                Add New User
              </Button>
            </Form>
          </Modal>
        </>
      ) : null}
    </div>
  );
};
