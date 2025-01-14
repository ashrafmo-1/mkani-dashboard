import React, { useEffect, useState } from "react";
import { useEditFaqsHook } from "./hooks/useEditFaqsHook";
import { Button, Col, Form, Input, Row, Select, Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useGetSingleFaqHook } from "./hooks/useGetSingleFaqHook";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const EditFaq = ({ faqId }) => {
  const { t } = useTranslation();
  const { editFaqs } = useEditFaqsHook();
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

  const handleSubmit = () => {
    setIsPending(true);
    form.validateFields().then((values) => {
      editFaqs({ faqId: faqId, values },{
            onSuccess: () => {
              setIsPending(false);
              setIsModalVisible(false);
            },
            onError: (error) => {
              setIsPending(false);
              const errorMessage = error.response?.data?.message;
              if (typeof errorMessage === "object") {
                Object.entries(errorMessage).forEach(([field, messages]) => {
                  messages.forEach((msg) => {
                    toast.error(msg);
                  });
                });
              }
            },
            onSettled: () => {
              setIsPending(false);
            },
          }
        );
      })
      .catch((errorInfo) => {
        setIsPending(false);
        console.log('Validate Failed:', errorInfo);
      });
  };

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        questionEn: data.questionEn,
        questionAr: data.questionAr,
        answerEn: data.answerEn,
        answerAr: data.answerAr,
        isPublished:
          data.isPublished !== undefined ? String(data.isPublished) : "",
        order: 1,
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
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label={t("faqs.labels.questionEn")} name="questionEn">
                <Input placeholder={t("faqs.placeholders.EnterQuestionEn")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={t("faqs.labels.questionAr")} name="questionAr">
                <Input placeholder={t("faqs.placeholders.EnterQuestionAr")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label={t("faqs.labels.answerEn")} name="answerEn">
                <Input placeholder={t("faqs.placeholders.EnterAnswerEn")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={t("faqs.labels.answerAr")} name="answerAr">
                <Input placeholder={t("faqs.placeholders.EnterAnswerAr")} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={t("globals.status.checlkPublished")}
            name="isPublished"
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

          <Col span={12} className="">
            <Form.Item label={t("faqs.labels.order")} name="order" hidden>
              <Input placeholder={t("faqs.placeholders.EnterOrder")} />
            </Form.Item>
          </Col>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            {t("globals.edit")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
