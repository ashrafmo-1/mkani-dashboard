import React, { useEffect, useState } from "react";
import { useEditFaqsHook } from "./hooks/useEditFaqsHook";
import { Button, Col, Form, Input, Row, Select, Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

export const EditFaq = ({ faqId, initialValues }) => {
  const { editFaq } = useEditFaqsHook();
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
      await editFaq(faqId, values);
      message.success("FAQ edited successfully.");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to edit FAQ.", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <Button className="edit" onClick={showModal}>
        <EditOutlined />
      </Button>

      <Modal
        title="Edit FAQ"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Question English"
                name="questionEn"
                rules={[
                  { required: true, message: "The question en field is required." },
                ]}
              >
                <Input placeholder="Enter question in English" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Question Arabic"
                name="questionAr"
                rules={[
                  { required: true, message: "The question ar field is required." },
                ]}
              >
                <Input placeholder="Enter question in Arabic" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Answer English"
                name="answerEn"
                rules={[
                  { required: true, message: "The answer en field is required." },
                ]}
              >
                <Input placeholder="Enter answer in English" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Answer Arabic"
                name="answerAr"
                rules={[
                  { required: true, message: "The answer ar field is required." },
                ]}
              >
                <Input placeholder="Enter answer in Arabic" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Is Published"
            name="isPublished"
            rules={[{ required: true, message: "The is published field is required." }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="1">Published</Select.Option>
              <Select.Option value="0">Draft</Select.Option>
            </Select>
          </Form.Item>

          <Col span={12}>
            <Form.Item
              label="Order"
              name="order"
              rules={[{ required: true, message: "The order field is required." }]}
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
            Edit FAQ
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
