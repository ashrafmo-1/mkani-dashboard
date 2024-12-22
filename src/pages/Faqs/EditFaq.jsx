import React, { useEffect, useState } from "react";
import { useEditFaqsHook } from "./hooks/useEditFaqsHook";
import { Button, Col, Form, Input, Row, Select, Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGetSingleFaqHook } from "./hooks/useGetSingleFaqHook";

export const EditFaq = ({ faqId }) => {
  const { editFaq } = useEditFaqsHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const { data } = useGetSingleFaqHook(faqId);

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

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        questionEn: data.questionEn,
        questionAr: data.questionAr,
        answerEn: data.answerEn,
        answerAr: data.answerAr,
        isPublished: data.isPublished,
        order: data.order,
      });
    }
  }, [data, form, isModalVisible]);

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
              <Form.Item label="Question English" name="questionEn">
                <Input placeholder="Enter question in English" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Question Arabic" name="questionAr">
                <Input placeholder="Enter question in Arabic" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Answer English" name="answerEn">
                <Input placeholder="Enter answer in English" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Answer Arabic" name="answerAr">
                <Input placeholder="Enter answer in Arabic" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Is Published" name="isPublished">
            <Select placeholder="Select status">
              <Select.Option value="1">Published</Select.Option>
              <Select.Option value="0">Draft</Select.Option>
            </Select>
          </Form.Item>

          <Col span={12}>
            <Form.Item label="Order" name="order">
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
