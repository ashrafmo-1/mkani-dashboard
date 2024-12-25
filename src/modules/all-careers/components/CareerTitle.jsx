import { Col, Input, Row, Form } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const CareerTitle = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Form.Item
          label={t("careers.labels.jobTitleEn")}
          name="titleEn"
          rules={[{ required: true, message: t("careers.placeholders.EnterJobTitleEn") }]}
        >
          <Input placeholder={t("careers.placeholders.EnterJobTitleEn")} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label={t("careers.labels.jobTitleAr")}
          name="titleAr"
          rules={[{ required: true, message: t("careers.placeholders.EnterJobTitleAr") }]}
        >
          <Input placeholder={t("careers.placeholders.EnterJobTitleAr")} />
        </Form.Item>
      </Col>
    </Row>
  );
};
