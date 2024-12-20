import { MinusCircleFilled, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Button, Input, Space } from "antd";
import React from "react";
// import {  } from "react-router-dom";

export const CareerMetaDataEn = () => {
  return (
    <Form.Item
      className="form_item_Metadata_career"
      label="Meta data Value arabic"
      name={["metaDataEn", 0]}
      rules={[{ required: true, message: "This field is required" }]}
    >
      <Form.List name="metaDataEn">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
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
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Input placeholder="Enter metadata value" />
                </Form.Item>
                <MinusCircleFilled onClick={() => remove(name)} />
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
    </Form.Item>
  );
};
