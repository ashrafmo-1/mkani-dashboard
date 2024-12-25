import { PlusSquareFilled, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  TimePicker,
  Upload,
} from "antd";
import React, { useState } from "react";
import { useAddEventHook } from "./Hooks/useAddEventHook";
import { useTranslation } from "react-i18next";

export const AddEvent = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { addEvent } = useAddEventHook();

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
        message.error(t("events.error.invalidStatus"));
      } else {
        message.error(t("events.error.submitFailed"));
        console.error("Error adding Event:", error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <Button onClick={() => showModal(true)} type="primary">
        <PlusSquareFilled />
        <span>{t("globals.add")}</span>
      </Button>
      <Modal
        title={t("globals.add")}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          className="mt-6"
          onFinish={handleSubmit}
          form={form}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("events.labels.titleAr")}
                name="titleAr"
                rules={[
                  {
                    required: true,
                    message: t("events.validation.titleArRequired"),
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("events.labels.titleEn")}
                name="titleEn"
                rules={[
                  { required: true, message: t("events.validation.titleEnRequired") },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("events.labels.slugAr")}
                name="slugAr"
                rules={[
                  { required: true, message: t("events.validation.slugArRequired") },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("events.labels.slugEn")}
                name="slugEn"
                rules={[
                  { required: true, message: t("events.validation.slugEnRequired") },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("events.labels.descriptionAr")}
                name="descriptionAr"
                rules={[
                  {
                    required: true,
                    message: t("events.validation.descriptionArRequired"),
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("events.labels.descriptionEn")}
                name="descriptionEn"
                rules={[
                  {
                    required: true,
                    message: t("events.validation.descriptionEnRequired"),
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
                label={t("events.labels.metaDataAr")}
                name="metaDataAr"
                rules={[
                  {
                    required: true,
                    message: t("events.validation.metaDataArRequired"),
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("events.labels.metaDataEn")}
                name="metaDataEn"
                rules={[
                  {
                    required: true,
                    message: t("events.validation.metaDataEnRequired"),
                  },
                ]}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={t("events.labels.thumbnail")}
            name="thumbnail"
            rules={[{ required: true, message: t("events.validation.thumbnailRequired") }]}
          >
            <Upload name="thumbnail" listType="picture">
              <Button icon={<UploadOutlined />}>{t("events.upload.clickToUpload")}</Button>
            </Upload>
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("events.labels.date")}
                name="date"
                rules={[{ required: true, message: t("events.validation.dateRequired") }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("events.labels.time")}
                name="time"
                rules={[{ required: true, message: t("events.validation.timeRequired") }]}
              >
                <TimePicker format="HH:mm:ss" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={t("events.labels.location")}
            name="location"
            rules={[{ required: true, message: t("events.validation.locationRequired") }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label={t("events.labels.isPublished")}
            name="isPublished"
            rules={[{ required: true, message: t("events.validation.isPublishedRequired") }]}
          >
            <Select placeholder={t("events.placeholder.selectStatus")}>
              <Select.Option value="1">{t("events.status.published")}</Select.Option>
              <Select.Option value="0">{t("events.status.draft")}</Select.Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            {t("globals.add")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
