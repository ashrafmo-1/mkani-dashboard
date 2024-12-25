import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import useEditNewsLetterHook from "./hooks/useEditNewsLetterHook";
import { useGetSingleNewsLetter } from "./hooks/useGetSingleNewsLetter";
import { useTranslation } from "react-i18next";

const EditNewsLetter = ({ newsletterId }) => {
  const { t } = useTranslation();
  const { editNewsletter } = useEditNewsLetterHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const { data } = useGetSingleNewsLetter(newsletterId);

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

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        subject: data.subject,
        content: data.content,
        isSent: data.isSent,
      });
    }
  }, [data, form, isModalVisible]);

  return (
    <div>
      <Button className="edit" onClick={showModal}>
        <EditOutlined />
      </Button>

      <Modal
        title={t("globals.edit")}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label={t("NewsLetter.labels.subject")} name="subject">
            <Input placeholder={t("NewsLetter.placeholders.EnterSubject")} />
          </Form.Item>

          <Form.Item label={t("NewsLetter.labels.content")} name="content">
            <Input placeholder={t("NewsLetter.placeholders.EnterContent")} />
          </Form.Item>

          <Form.Item label={t("NewsLetter.labels.isSent")} name="isSent">
            <Select placeholder={t("NewsLetter.placeholders.SelectStatus")}>
              <Select.Option value="1">{t("globals.status.yes")}</Select.Option>
              <Select.Option value="0">{t("globals.status.no")}</Select.Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full" loading={isPending}>
            {t("globals.edit")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default EditNewsLetter;
