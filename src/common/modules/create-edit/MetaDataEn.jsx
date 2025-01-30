import { Col, Form, Input, Select, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const MetaDataEn = () => {
  const { t } = useTranslation();

  return (
    <Col span={12}>
      <Space direction="vertical" size="large" className="metadata-space">
        <Form.Item
          label={t("Meta Data in English title")}
          name={["metaDataEn", "title"]}
        >
          <Input
            placeholder={t("Meta Data in English title")}
            className="metadata-input"
          />
        </Form.Item>
        <Form.Item
          label={t("Meta Data in English description")}
          name={["metaDataEn", "description"]}
        >
          <Input.TextArea
            placeholder={t("Meta Data in English description")}
            className="metadata-textarea"
          />
        </Form.Item>
        <Form.Item
          label={t("Meta Data in English keywords")}
          name={["metaDataEn", "keywords"]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder={t("Meta Data in English keywords")}
            className="metadata-input"
          />
        </Form.Item>
      </Space>
    </Col>
  );
};
