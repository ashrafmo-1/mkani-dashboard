import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Button, Input, Space } from "antd";
import React from "react";
// import {  } from "react-router-dom";

export const CareermetaDataAr = () => {
  return (
    <div>
      <Form.Item
        className="form_item_Metadata_career"
        label="Meta data Value arabic"
        name={["metaDataAr", 0]}
        rules={[{ required: true, message: "This field is required" }]}
      >
        <Input placeholder="Enter first metadata value" />
      </Form.Item>

      <Form.List name="metaDataAr">
        {(fields, { add, remove }) => (
          <>
            {fields.slice(1).map(({ key, name, fieldKey, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 5 }}
                align="baseline"
              >
                <Form.Item
                  className="form_item_Metadata_career"
                  {...restField}
                  name={name}
                  fieldKey={fieldKey}
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                >
                  <Input placeholder="Enter metadata value" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add Field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};
