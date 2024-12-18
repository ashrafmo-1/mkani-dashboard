import { Col, Input, Row, Form } from "antd";
import React from "react";

export const CareerTitle = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Form.Item
          label="title english"
          name="titleEn"
          rules={[{ required: true, message: "title english is required." }]}
        >
          <Input placeholder="title question english" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="title arabic"
          name="titleAr"
          rules={[{ required: true, message: "title arabic is required." }]}
        >
          <Input placeholder="Enter title arabic" />
        </Form.Item>
      </Col>
    </Row>
  );
};
