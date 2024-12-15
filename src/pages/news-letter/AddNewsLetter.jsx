import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { Button, Form, Input, message, Modal, Select } from "antd";
import useAddNewNewsLetterHook from "./hooks/useAddNewNewsLetterHook";

const AddNewsLetter = () => {
  const hasCreateUserPermission = checkPermission("create_customer");
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { addNewsletter } = useAddNewNewsLetterHook();

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
      await addNewsletter(formData);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.status) {
        message.error("The selected status is invalid.");
      } else {
        message.error("Failed to send form. Please try again.");
        console.error("Error adding FAQ:", error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      {hasCreateUserPermission && (
        <Button onClick={showModal}>add new News letter</Button>
      )}
      <Modal
        title="Add New FAQ"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="subject"
            name="subject"
            rules={[
              { required: true, message: "subject is required." },
            ]}
          >
            <Input placeholder="Enter subject" />
          </Form.Item>

          <Form.Item
            label="content"
            name="content"
            rules={[
              { required: true, message: "content is required." },
            ]}
          >
            <Input placeholder="Enter content" />
          </Form.Item>

          <Form.Item
            label="is sent"
            name="isSent"
            rules={[{ required: true, message: "is isSent is required." }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="1">Sent</Select.Option>
              <Select.Option value="0">no</Select.Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            Add New Faq
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewsLetter;
