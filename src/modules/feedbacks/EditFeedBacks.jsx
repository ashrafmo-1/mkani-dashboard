import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useEditFeedBackHook } from "./hooks/useEditFeedBackHook";
import { useTranslation } from "react-i18next";
import { useGetSingleFeedBackHook } from "./hooks/useGetSingleFeedBackHook";

export const EditFeedBacks = ({ feedbackId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { editFeedback } = useEditFeedBackHook();
  const { t } = useTranslation();
  const { data } = useGetSingleFeedBackHook(feedbackId);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  console.log(data);

  const handleSubmit = () => {
    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        editFeedback(
          { feedbackId: feedbackId, values },
          {
            onSuccess: () => {
              setLoading(false);
              setIsModalVisible(false);
            },
            onError: (error) => {
              setLoading(false);
              const errorMessage = error.response?.data?.message;
              if (typeof errorMessage === "object") {
                Object.entries(errorMessage).forEach(([field, messages]) => {
                  messages.forEach((msg) => {
                    toast.error(msg);
                  });
                });
              } else {
                toast.error(errorMessage || "Failed to edit customer.");
              }
            },
            onSettled: () => {
              setLoading(false);
            },
          }
        );
      })
      .catch((errorInfo) => {
        setLoading(false);
        console.log("Validate Failed:", errorInfo);
      });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        feedback: data.feedback,
        rating: data.rating,
      });
    }
  }, [data, form]);

  return (
    <div>
      <Button className="edit" onClick={showModal}>
        <EditOutlined />
      </Button>

      <Modal
        title="Edit feed back"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label={t("customers.name")}
            name="name"
            rules={[{ required: true, message: "Name is required." }]}
          >
            <Input
              placeholder={t("customers.placeholder.EnterName")}
              allowClear
            />
          </Form.Item>
          <Form.Item
            label={t("Feedback")}
            name="feedback"
            rules={[{ required: true, message: "Feedback is required." }]}
          >
            <Input.TextArea placeholder={t("enter your feedback")} allowClear />
          </Form.Item>
          <Form.Item
            label={t("Rating")}
            name="rating"
            rules={[{ required: true, message: "Rating is required." }]}
          >
            <Select placeholder={t("select rating")} allowClear>
              <Select.Option value={1}>⭐</Select.Option>
              <Select.Option value={2}>⭐⭐</Select.Option>
              <Select.Option value={3}>⭐⭐⭐</Select.Option>
              <Select.Option value={4}>⭐⭐⭐⭐</Select.Option>
              <Select.Option value={5}>⭐⭐⭐⭐⭐</Select.Option>
            </Select>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Edit Customer
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
