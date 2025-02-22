import { Form, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const SelectMediaType = () => {
  const { t } = useTranslation();

  return (
    <Form.Item label="media type" name="type" rules={[{required: true, message: t("value") + " is required."}]}>
      <Select placeholder="Select status">
        <Select.Option value="0">
          <div className="flex items-center gap-1">
            <span className="bg-green-600 p-1 rounded-full"></span>
            <span>{"photo"}</span>
          </div>
        </Select.Option>

        <Select.Option value="1">
          <div className="flex items-center gap-1">
            <span className="bg-red-600 p-1 rounded-full"></span>
            <span>{"video"}</span>
          </div>
        </Select.Option>
      </Select>
    </Form.Item>
  );
};