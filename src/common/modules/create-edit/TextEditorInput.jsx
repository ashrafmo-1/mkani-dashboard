import { Form } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import Editor from 'react-simple-wysiwyg';

export const TextEditorInput = () => {
  const form = Form.useFormInstance();
  const { t } = useTranslation();
  
  const handleContentChange = (content) => {
    if (typeof content === 'string') {
      form.setFieldValue("contentEn", content);
    } else {
      console.error("Content for English is not a string:", content);
    }
  };

  const handleContentArChange = (content) => {
    if (typeof content === 'string') {
      form.setFieldValue("contentAr", content);
    } else {
      console.error("Content for Arabic is not a string:", content);
    }
  };

  return (
    <div>
      <Form.Item
        label={t("products.add.lables.ContentEN")}
        name="contentEn"
        className="mb-16"
        rules={[{ required: true, message: t("value") + " is required." }]}
      >
        <Editor 
          value={form.getFieldValue("contentEn") || ""} 
          onChange={handleContentChange} 
        />
      </Form.Item>

      <Form.Item
        label={t("products.add.lables.ContentAR")}
        name="contentAr"
        className="mb-16"
        rules={[{ required: true, message: t("value") + " is required." }]}
      >
        <Editor 
          value={form.getFieldValue("contentAr") || ""} 
          onChange={handleContentArChange} 
        />
      </Form.Item>
    </div>
  );
};
