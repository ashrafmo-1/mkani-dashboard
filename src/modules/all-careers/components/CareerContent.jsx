import { Form, Col, Row } from "antd";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const CareerContent = () => {
  const form = Form.useFormInstance();

  return (
    <Row gutter={[16, 16]} className="mb-5">
      <Col span={12}>
        <Form.Item label="Content English" name="contentEn" rules={[{ required: true, message: "Content English is required." }]}>
          <ReactQuill className="h-60" theme="snow" placeholder="Enter content in English"
            onChange={(value) => { form.setFieldValue("contentEn", value) }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Content Arabic" name="contentAr" rules={[{ required: true, message: "Content Arabic is required." }]}>
          <ReactQuill className="h-60" theme="snow" placeholder="Enter content in English"
            onChange={(value) => { form.setFieldValue("contentAr", value) }} />
        </Form.Item>
      </Col>
    </Row>
  );
};