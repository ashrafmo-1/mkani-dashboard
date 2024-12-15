import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { useCustomerHook } from "./Hooks/useCustomerHook";

export const AddNewCustomer = () => {
  const hasCreateUserPermission = checkPermission("create_customer");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { addCustomer } = useCustomerHook()
  const [isPending, setIsPending] = useState(false);
  
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
      await addCustomer(formData);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.status) {
        message.error("The selected status is invalid.");
      } else {
        console.error("Error adding user:", error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      {hasCreateUserPermission && ( <Button onClick={showModal}>add new customers</Button> )}
      <Modal title="Add New Admin" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required." }]}>
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="email" name="email" rules={[{ required: true, message: "email is required." }]}>
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Phone is required." }]}>
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true, message: "Address is required." }]}>
            <Input placeholder="Enter address" />
          </Form.Item>
          <Form.Item label="description" name="description"
            rules={[ 
              { required: true, message: "description is required." },
              { type: "description", message: "Please enter description" },
            ]}
          >
            <Input placeholder="Enter description" aria-label="description" />
          </Form.Item>

          {/* Submit Button */}
          <Button type="primary" htmlType="submit" className="w-full" loading={isPending}>
            Add New User
          </Button>
        </Form>
      </Modal>
    </div>
  );
};