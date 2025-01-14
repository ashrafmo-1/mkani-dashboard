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
import { MetaDataAr } from "../../common/modules/create-edit/MetaDataAr";
import { MetaDataEn } from "../../common/modules/create-edit/MetaDataEn";
import { Slug } from "../../common/modules/create-edit/Slug";
import { Description } from "../../common/modules/create-edit/Description";
import { Title } from "../../common/modules/create-edit/Title";
import { toast } from "react-toastify";

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

  const handleSubmit = () => {
    setIsPending(true);
    form
      .validateFields()
      .then((formData) => {
        addEvent(formData, {
          onSuccess: () => {
            setIsPending(false);
            handleCancel();
          },
          onError: (error) => {
            setIsPending(false);
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === "object") {
              for (const [messages] of Object.entries(errorMessage)) {
                messages.forEach((msg) => {
                  toast.error(msg);
                });
              }
            } else {
              toast.error(errorMessage || "Failed to add customer.");
            }
          },
        });
      })
      .catch((errorInfo) => {
        setIsPending(false);
        console.log("Validate Failed:", errorInfo);
      });
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
        width={800}
      >
        <Form
          layout="vertical"
          className="mt-6"
          onFinish={handleSubmit}
          form={form}
        >
          <Title />
          <Slug />
          <Description />
          <Row gutter={[16, 16]}>
            <MetaDataAr />
            <MetaDataEn />
          </Row>

          <Form.Item
            label={t("events.labels.thumbnail")}
            name="thumbnail"
            rules={[
              {
                required: true,
                message: t("events.validation.thumbnailRequired"),
              },
            ]}
          >
            <Upload name="thumbnail" listType="picture">
              <Button icon={<UploadOutlined />}>
                {t("events.upload.clickToUpload")}
              </Button>
            </Upload>
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("events.labels.date")}
                name="date"
                rules={[
                  {
                    required: true,
                    message: t("events.validation.dateRequired"),
                  },
                ]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label={t("events.labels.time")}
                rules={[
                  {
                    required: true,
                    message: t("events.validation.timeRequired"),
                  },
                ]}
              >
                <TimePicker format="HH:mm:ss" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={t("events.labels.location")}
            name="location"
            rules={[
              {
                required: true,
                message: t("events.validation.locationRequired"),
              },
            ]}
          >
            <Input type="text" placeholder="enter location" />
          </Form.Item>

          <Form.Item
            label={t("globals.isPublished")}
            name="isPublished"
            rules={[
              {
                required: true,
                message: t("events.validation.isPublishedRequired"),
              },
            ]}
          >
            <Select placeholder={t("globals.isPublished")}>
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
