import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space, Form } from "antd";
import React from "react";

export const CareerExtraDetailsAr = () => {
  return (
    <Form.List name="extraDetailsAr">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Space
              key={key}
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, "title"]}
                fieldKey={[fieldKey, "title"]}
                rules={[{ required: true, message: "Title is required" }]}
              >
                <Input placeholder="Enter title English" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, "value"]}
                fieldKey={[fieldKey, "value"]}
                rules={[{ required: true, message: "Value is required" }]}
              >
                <Input placeholder="Enter value English" />
              </Form.Item>
              {fields.length > 1 && (
                <MinusCircleOutlined onClick={() => remove(name)} />
              )}
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              Add English extra Detail
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
