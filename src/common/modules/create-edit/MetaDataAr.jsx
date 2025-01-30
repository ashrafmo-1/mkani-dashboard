import { Col, Form, Input, Select, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const MetaDataAr = () => {
  const { t } = useTranslation();
  return (
    <Col span={12}>
      <Space direction="vertical" size="large" className="metadata-space">
        <Form.Item
          label={t("meta Data Arabic title")}
          name={["metaDataAr", "title"]}
        >
          <Input
            placeholder={t("meta Data Arabic title")}
            className="metadata-input"
          />
        </Form.Item>
        <Form.Item
          label={t("meta Data Arabic description")}
          name={["metaDataAr", "description"]}
        >
          <Input.TextArea
            placeholder={t("meta Data Arabic description")}
            className="metadata-textarea"
          />
        </Form.Item>
        <Form.Item
          label={t("meta Data Arabic keywords")}
          name={["metaDataAr", "keywords"]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder={t("meta Data Arabic keywordss")}
            className="metadata-input"
          />
        </Form.Item>
      </Space>
    </Col>
  );
};
