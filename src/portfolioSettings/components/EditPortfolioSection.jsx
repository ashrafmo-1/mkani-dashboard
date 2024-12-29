import { EditFilled, UploadOutlined } from "@ant-design/icons";
import { Button,                                                                                                    Form, Input, Modal, Select, Upload } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEditPortfolioSectionHook } from "../hooks/useEditPortfolioSectionHook";
import ReactQuill from "react-quill";

export const EditPortfolioSection = ({ frontPageSectionId }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { editPortfolioSections } = useEditPortfolioSectionHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      await editPortfolioSections(frontPageSectionId, values);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to edit portfolio section:", error);
    }
  };

  const getValueFromEvent = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList ? e.fileList.map((file) => file.originFileObj) : [];
  };

  return (
    <div>
      <Button onClick={showModal} color="default" variant="filled">
        <EditFilled />
      </Button>

      <Modal
        title={t("edit section")}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label={t("name")} name="name">
            <Input placeholder={t("NewsLetter.placeholders.EnterContent")} />
          </Form.Item>

          <Form.Item
            label={t("products.add.lables.ContentEN")}
            name="contentEn"
            rules={[
              { required: true, message: "content english is required." },
            ]}
            className="mb-10"
          >
            <ReactQuill
              className="h-60"
              theme="snow"
              placeholder={t("products.add.placeholder.EnterContentEN")}
              onChange={(value) => {
                form.setFieldValue("contentEn", value);
              }}
            />
          </Form.Item>

          <Form.Item
            label={t("products.add.lables.ContentAR")}
            name="contentAr"
            rules={[{ required: true, message: "content arabic is required." }]}
            className="mb-10"
          >
            <ReactQuill
              className="h-60"
              theme="snow"
              placeholder={t("products.add.placeholder.EnterContentAR")}
              onChange={(value) => {
                form.setFieldValue("contentAr", value);
              }}
            />
          </Form.Item>

          <Form.Item
            label={t("upload images")}
            name="images"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
          >
            <Upload
              name="images"
              listType="picture"
              beforeUpload={() => false}
              multiple
            >
              <Button icon={<UploadOutlined />}>{t("globals.upload")}</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="is active"
            name="isActive"
            rules={[{ required: true, message: "is active is required." }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="1">done</Select.Option>
              <Select.Option value="0">no</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("globals.edit")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
