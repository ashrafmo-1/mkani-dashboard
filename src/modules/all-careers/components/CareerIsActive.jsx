import { Select, Form } from "antd";
import React from "react";
import { useTranslation } from 'react-i18next';

export const CareerIsActive = () => {
  const { t } = useTranslation();

  return (
    <Form.Item
      label={t("globals.status.title")}
      name="isActive"
      rules={[{ required: true, message: t("globals.status.required") }]}
    >
      <Select placeholder={t("globals.status.checkActive")}>
        <Select.Option value="1">{t("globals.status.published")}</Select.Option>
        <Select.Option value="0">{t("globals.status.draft")}</Select.Option>
      </Select>
    </Form.Item>
  );
};