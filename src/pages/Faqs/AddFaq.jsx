import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import { useAddFaqHook } from "./hooks/useAddFaqHook";

export const AddFaq = () => {
  const hasCreateUserPermission = checkPermission("create_customer");
  const { addFaq } = useAddFaqHook();
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

  const handleSubmit = async (formData) => {
    try {
      setIsPending(true);
      await addFaq(formData);
      message.success("FAQ added successfully.");
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
        <Button onClick={showModal}>add new faq</Button>
      )}

      <Modal
        title="Add New FAQ"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="question english"
                name="questionEn"
                rules={[
                  { required: true, message: "question english is required." },
                ]}
              >
                <Input placeholder="Enter question english" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="question arabic"
                name="questionAr"
                rules={[
                  { required: true, message: "question arabic is required." },
                ]}
              >
                <Input placeholder="Enter question arabic" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="answer english"
                name="answerEn"
                rules={[
                  { required: true, message: "answer english is required." },
                ]}
              >
                <Input placeholder="Enter answer english" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="answer arabic"
                name="answerAr"
                rules={[
                  { required: true, message: "answer arabic is required." },
                ]}
              >
                <Input placeholder="Enter answer arabic" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="is published"
            name="isPublished"
            rules={[{ required: true, message: "is published is required." }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="1">Published</Select.Option>
              <Select.Option value="0">Draft</Select.Option>
            </Select>
          </Form.Item>

          <Col span={12}>
            <Form.Item
              label="order"
              name="order"
              rules={[
                { required: true, message: "order is required." },
              ]}
            >
              <Input placeholder="Enter order" />
            </Form.Item>
          </Col>

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
