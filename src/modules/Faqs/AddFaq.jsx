import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useAddFaqHook } from "./hooks/useAddFaqHook";
import { PlusSquareFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const AddFaq = () => {
  const { t } = useTranslation();
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
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.status) {
        console.error("The selected status is invalid.");
      } else {
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
          {t("globals.add")}
          <PlusSquareFilled />
        </Button>
      )}

      <Modal
        title={t("globals.add")}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("faqs.labels.questionEn")}
                name="questionEn"
                rules={[
                  {
                    required: true,
                    message: t("faqs.placeholders.EnterQuestionEn"),
                  },
                ]}
              >
                <Input placeholder={t("faqs.placeholders.EnterQuestionEn")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("faqs.labels.questionAr")}
                name="questionAr"
                rules={[
                  {
                    required: true,
                    message: t("faqs.placeholders.EnterQuestionAr"),
                  },
                ]}
              >
                <Input placeholder={t("faqs.placeholders.EnterQuestionAr")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("faqs.labels.answerEn")}
                name="answerEn"
                rules={[
                  {
                    required: true,
                    message: t("faqs.placeholders.EnterAnswerEn"),
                  },
                ]}
              >
                <Input placeholder={t("faqs.placeholders.EnterAnswerEn")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("faqs.labels.answerAr")}
                name="answerAr"
                rules={[
                  {
                    required: true,
                    message: t("faqs.placeholders.EnterAnswerAr"),
                  },
                ]}
              >
                <Input placeholder={t("faqs.placeholders.EnterAnswerAr")} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={t("globals.status.checlkPublished")}
            name="isPublished"
            rules={[
              { required: true, message: t("globals.status.checlkPublished") },
            ]}
          >
            <Select placeholder={t("globals.status.checlkPublished")}>
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

          <Col span={12}>
            <Form.Item
              label={t("faqs.labels.order")}
              name="order"
              rules={[
                { required: true, message: t("placeholders.EnterOrder") },
              ]}
            >
              <Input placeholder={t("faqs.placeholders.EnterOrder")} />
            </Form.Item>
          </Col>

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
