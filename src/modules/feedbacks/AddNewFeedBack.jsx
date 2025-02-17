import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAddNewFeedBackHook } from "./hooks/useAddNewFeedBackHook";
import { toast } from "react-toastify";
import { PlusSquareFilled } from "@ant-design/icons";

export const AddNewFeedBack = () => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { addNewfeedbackData } = useAddNewFeedBackHook();
  const [isPending, setIsPending] = useState(false);

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
        addNewfeedbackData(formData, {
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
      <Button onClick={showModal} type="primary">
        <PlusSquareFilled /> {t("customers.add")}
      </Button>

      <Modal
        title={t("customers.add")}
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
          <Form.Item label={t("Feedback")} name="feedback" rules={[{ required: true, message: "Feedback is required." }]}>
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
          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            disabled={isPending}
          >
            {t("customers.add")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
