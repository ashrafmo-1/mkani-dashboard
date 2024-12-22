import { Select, Form } from "antd";
import React from "react";

export const CareerIsActive = () => {
  return (
    <Form.Item
      label="is active"
      name="isActive"
      rules={[{ required: true, message: "is Active is required." }]}
    >
      <Select placeholder="Select status">
        <Select.Option value="1">Published</Select.Option>
        <Select.Option value="0">Draft</Select.Option>
      </Select>
    </Form.Item>
  );
};
