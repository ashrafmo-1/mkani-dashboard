import { Form, Col, Input, Row } from "antd";
import React from "react";
// import {  } from "react-router-dom";

export const CareerContent = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Form.Item
          label="content english"
          name="contentEn"
          rules={[{ required: true, message: "content english is required." }]}
        >
          <Input placeholder="Enter content english" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="content arabic"
          name="contentAr"
          rules={[{ required: true, message: "content arabic is required." }]}
        >
          <Input placeholder="Enter content arabic" />
        </Form.Item>
      </Col>
    </Row>
  );
};
