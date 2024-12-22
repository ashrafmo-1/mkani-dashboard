import {
  PlusCircleTwoTone,

  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select,
  TimePicker,
  Upload,
} from "antd";
import React, { useState } from "react";
import { useAddEventHook } from "./Hooks/useAddEventHook";

export const AddEvent = () => {
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {addEvent} = useAddEventHook();

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
      await addEvent(formData);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.status) {
        message.error("The selected status is invalid.");
      } else {
        message.error("Failed to send form. Please try again.");
        console.error("Error adding Event:", error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <Button onClick={() => showModal(true)}>
        <PlusCircleTwoTone />
        <span>add new Event</span>
      </Button>
      <Modal title="Add New Event" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form layout="vertical" className="mt-6" onFinish={handleSubmit} form={form}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="title (Arabic)"
                name="titleAr"
                rules={[
                  {
                    required: true,
                    message: "Question in Arabic is required.",
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="Title (English)"
                name="titleEn"
                rules={[
                  { required: true, message: "Title in English is required." },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Slug (Arabic)"
                name="slugAr"
                rules={[
                  { required: true, message: "Slug in Arabic is required." },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Slug (English)"
                name="slugEn"
                rules={[
                  { required: true, message: "Slug in English is required." },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Description (Arabic)"
                name="descriptionAr"
                rules={[
                  {
                    required: true,
                    message: "Description in Arabic is required.",
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Description (English)"
                name="descriptionEn"
                rules={[
                  {
                    required: true,
                    message: "Description in English is required.",
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Meta Data (Arabic)"
                name="metaDataAr"
                rules={[
                  {
                    required: true,
                    message: "Meta Data in Arabic is required.",
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Meta Data (English)"
                name="metaDataEn"
                rules={[
                  {
                    required: true,
                    message: "Meta Data in English is required.",
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Thumbnail"
            name="thumbnail"
            rules={[{ required: true, message: "Thumbnail is required." }]}
          >
            <Upload name="thumbnail" listType="picture">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Date is required." }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Time is required." }]}
              >
                <TimePicker format="HH:mm:ss" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Location is required." }]}
          >
            <Input type="text" />
          </Form.Item>

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
