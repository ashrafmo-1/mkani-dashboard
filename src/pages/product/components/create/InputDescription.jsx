import { Col, Form, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

export const InputDescription = () => {
  return (
    <Row gutter={[16, 16]}>
    <Col span={12}>
      <Form.Item
        label="description english"
        name="descriptionEn"
        rules={[
          {
            required: true,
            message: "description english is required.",
          },
        ]}
      >
        <TextArea placeholder="Enter description english" autoSize={{ minRows: 9 }} />
      </Form.Item>
    </Col>

    <Col span={12}>
      <Form.Item
        label="description arabic"
        name="descriptionAr"
        rules={[
          {
            required: true,
            message: "description arabic is required.",
          },
        ]}
      >
        <TextArea placeholder="Enter description arabic" autoSize={{ minRows: 9 }} />
      </Form.Item>
    </Col>
  </Row>
  )
}

