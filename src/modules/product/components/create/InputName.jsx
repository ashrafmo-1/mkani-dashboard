import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const InputName = () => {
  const { t } = useTranslation();
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Form.Item label={t("products.add.lables.nameEN")} name="nameEn">
          <Input placeholder={t("products.add.placeholder.EnterEnName")} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label={t("products.add.lables.nameAR")} name="nameAr">
          <Input placeholder={t("products.add.placeholder.EnterArName")} />
        </Form.Item>
      </Col>
    </Row>
  );
};