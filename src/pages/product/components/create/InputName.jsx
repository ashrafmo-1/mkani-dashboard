import { Col, Form, Input, Row } from "antd";
import React from "react";

export const InputName = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Form.Item
          label="name english"
          name="nameEn"
          rules={[{ required: true, message: "name english is required." }]}
        >
          <Input placeholder="Enter name english" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="name arabic"
          name="nameAr"
          rules={[{ required: true, message: "name arabic is required." }]}
        >
          <Input placeholder="Enter name arabic" />
        </Form.Item>
      </Col>
    </Row>
  );
};
