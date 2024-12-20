import { Col, Form, Row } from "antd";
import React from "react";
import ReactQuill from "react-quill";


export const InputContent = () => {
  const form = Form.useFormInstance();
  return (
    <Row gutter={[16, 16]} className="mb-8">
      <Col span={12}>
        <Form.Item
          label="content english"
          name="contentEn"
          rules={[{ required: true, message: "content english is required." }]}
        >
          <ReactQuill className="h-60" theme="snow" placeholder="Enter content in English"
            onChange={(value) => { form.setFieldValue("contentEn", value) }} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          label="content arabic"
          name="contentAr"
          rules={[{ required: true, message: "content arabic is required." }]}
        >
          <ReactQuill className="h-60" theme="snow" placeholder="Enter content in English"
            onChange={(value) => { form.setFieldValue("contentAr", value) }} />
        </Form.Item>
      </Col>
    </Row>
  );
};
