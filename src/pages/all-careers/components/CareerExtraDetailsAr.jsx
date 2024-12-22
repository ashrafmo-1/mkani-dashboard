import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space, Form } from "antd";
import React from "react";

export const CareerExtraDetailsAr = () => {
  return (
    <Form.Item
      name="extraDetailsAr"
      label="arabic extra Detail"
      rules={[{ required: true, message: "This field is required" }]}
    >
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
                  <Input placeholder="Enter title arabic" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "value"]}
                  fieldKey={[fieldKey, "value"]}
                  rules={[{ required: true, message: "Value is required" }]}
                >
                  <Input placeholder="Enter value arabic" />
                </Form.Item>
                {fields.length > 1 && (
                  <MinusCircleOutlined onClick={() => remove(name)} />
                )}
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add arabic extra Detail
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};
