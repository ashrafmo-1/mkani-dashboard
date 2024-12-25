import { Col, Row, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useTranslation } from 'react-i18next';

export const CareerDescription = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Form.Item
          label={t("careers.labels.descriptionEn")}
          name="descriptionEn"
          rules={[
            {
              required: true,
              message: t("careers.labels.descriptionEn") + " " + t("careers.table.isActive") + ".",
            },
          ]}
        >
          <TextArea placeholder={t("careers.placeholders.EnterDescriptionEn")} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label={t("careers.labels.descriptionAr")}
          name="descriptionAr"
          rules={[
            {
              required: true,
              message: t("careers.labels.descriptionAr") + " " + t("careers.table.isActive") + ".",
            },
          ]}
        >
          <TextArea placeholder={t("careers.placeholders.EnterDescriptionAr")} />
        </Form.Item>
      </Col>
    </Row>
  );
};