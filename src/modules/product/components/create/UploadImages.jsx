import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, message, Upload } from "antd";
import React from "react";

export const UploadImages = () => {
  return (
    <Form.Item
      label="Upload Images"
      name="images"
      valuePropName="fileList"
      getValueFromEvent={(e) => {
        if (!e || !e.fileList) {
          return [];
        }
        return e.fileList.map((file) => ({
          file: file.originFileObj, // الملف الفعلي الذي سيتم تمريره
          path: file.response?.url || file.name, // احتفظ بالرابط في حالة الحاجة إليه
        }));
      }}
      
      rules={[{ required: true, message: "Please upload at least one image." }]}
    >
      <Upload
        name="file"
        action="/upload"
        listType="picture"
        multiple={true}
        maxCount={5}
        onChange={(info) => {
          if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        }}
      >
        <Button icon={<UploadOutlined />}>Upload Images</Button>
      </Upload>
    </Form.Item>
  );
};
