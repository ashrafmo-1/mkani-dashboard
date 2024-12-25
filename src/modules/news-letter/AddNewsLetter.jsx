import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { Button, Form, Input, message, Modal, Select } from "antd";
import useAddNewNewsLetterHook from "./hooks/useAddNewNewsLetterHook";
import { useTranslation } from "react-i18next";
import { PlusSquareFilled } from "@ant-design/icons";

const AddNewsLetter = () => {
  const { t } = useTranslation();
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
        <Button onClick={showModal} type="primary">
          <PlusSquareFilled />
          {t("globals.add")}</Button>
      )}

      <Modal
        title={t("globals.add")}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label={t("NewsLetter.labels.subject")}
            name="subject"
            rules={[{ required: true, message: t("validation.titleEnRequired") }]}
          >
            <Input placeholder={t("NewsLetter.placeholders.EnterSubject")} />
          </Form.Item>

          <Form.Item
            label={t("NewsLetter.labels.content")}
            name="content"
            rules={[{ required: true, message: t("validation.descriptionEnRequired") }]}
          >
            <Input placeholder={t("NewsLetter.placeholders.EnterContent")} />
          </Form.Item>

          <Form.Item
            label={t("NewsLetter.labels.isSent")}
            name="isSent"
            rules={[{ required: true, message: t("validation.isPublishedRequired") }]}
          >
            <Select placeholder={t("NewsLetter.placeholders.SelectStatus")}>
              <Select.Option value="1">{t("globals.status.yes")}</Select.Option>
              <Select.Option value="0">{t("globals.status.no")}</Select.Option>
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

export default AddNewsLetter;
