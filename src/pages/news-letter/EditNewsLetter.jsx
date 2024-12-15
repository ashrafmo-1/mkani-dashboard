import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import useEditNewsLetterHook from "./hooks/useEditNewsLetterHook";

const EditNewsLetter = ({initialValues, newsletterId}) => {
  const { editNewsletter } = useEditNewsLetterHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);

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
    setIsPending(true);
    try {
      await editNewsletter(newsletterId, values);
      message.success("news letter edited successfully.");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to edit news letter.", error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div>
      <Button className="edit" onClick={showModal} >
        <EditOutlined />
      </Button>

      <Modal
        title="edit New news letter"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="subject"
            name="subject"
            rules={[{ required: true, message: "subject is required." }]}
          >
            <Input placeholder="Enter subject" />
          </Form.Item>

          <Form.Item
            label="content"
            name="content"
            rules={[{ required: true, message: "content is required." }]}
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

          <Button type="primary" htmlType="submit" className="w-full" loading={isPending}>{"edit"}</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default EditNewsLetter;
