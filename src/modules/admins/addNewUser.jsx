import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { Modal, Button, Form, Input, Col, Select, Row, message } from "antd";
import { useSelectsHook } from "../../Hooks/useSelectsHook";
import { PlusSquareFilled } from "@ant-design/icons";
import { useAddUserHook } from "./Hooks/useAddUserHook";
import { useTranslation } from "react-i18next";

export const AddNewUser = () => {
  const { t } = useTranslation();
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
    form.resetFields();
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
          <Button type="primary" onClick={showModal}>
            <PlusSquareFilled />
            {t("users.add")}
          </Button>

          <Modal
            title={t("users.add")}
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
                    label="Username"
                    name="username"
                    rules={[
                      { required: true, message: "Username is required." },
                    ]}
                  >
                    <Input placeholder="Enter username" />
                  </Form.Item>
                </Col>
              </Row>

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

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: "Status is required." }]}
                  >
                    <Select placeholder="Select status">
                      <Select.Option value="1">
                        <div className="flex items-center gap-1">
                          <span className="bg-green-600 p-1 rounded-full"></span>
                          <span>{t("globals.status.active")}</span>
                        </div>
                      </Select.Option>
                      <Select.Option value="0">
                        <div className="flex items-center gap-1">
                          <span className="bg-red-600 p-1 rounded-full"></span>
                          <span>{t("globals.status.inActive")}</span>
                        </div>
                      </Select.Option>
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
                      {type.map((item) => (
                        <Select.Option value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
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

              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                {t("users.add")}
              </Button>
            </Form>
          </Modal>
        </>
      ) : null}
    </div>
  );
};
