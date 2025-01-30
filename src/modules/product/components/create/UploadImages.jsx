import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const UploadImages = ({isEdit}) => {
  const { t } = useTranslation();

  const normFile = (e) => {
    if (!e || !e.fileList) {
      return [];
    }
    
    return e.fileList
  };

  return (
    <Form.Item
      name="images"
      label={t("Upload Images")}

      {...isEdit ? {valuePropName : "fileList"} : ""}
      {...isEdit ? {getValueFromEvent : normFile} : ""}

      rules={[
        {
          required: true,
          message: `${t("Images")} ${t("is required")}.`,
        },
      ]}
    >
      <Upload
        name="file"
        action="/upload"
        listType="picture"
        multiple
        maxCount={2}
        onChange={(info) => {
          if (info.file.status === "done") {
            console.log(`${info.file.name} ${t("file uploaded successfully")}.`);
          } else if (info.file.status === "error") {
            console.error(`${info.file.name} ${t("file upload failed")}.`);
          }
        }}
      >
        <Button icon={<UploadOutlined />}>{t("Upload Images")}</Button>
      </Upload>
    </Form.Item>
  );
};

