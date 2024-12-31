import { EditFilled, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useEditPortfolioSectionHook } from "../hooks/useEditPortfolioSectionHook";
import { useGetSinglePortfolioSectionHook } from "../hooks/useGetSinglePortfolioSectionHook";

export const EditPortfolioSection = ({ frontPageSectionId }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  // const { editPortfolioSections } = useEditPortfolioSectionHook();
  const { data } = useGetSinglePortfolioSectionHook(frontPageSectionId);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const getValueFromEvent = (e) => {
    const isValidFile = (file) =>
      ["image/png", "image/jpeg"].includes(file.type) && file.size <= 2 * 1024 * 1024;
    return e && e.fileList
      ? e.fileList.filter((file) => isValidFile(file.originFileObj)).map((file) => file.originFileObj)
      : [];
  };

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        name: data?.name || "",
        isActive: data?.isActive ? "1" : "0",
        contentEn: data?.contentEn?.[0] || { heading: "", description: "", link: "" },
        contentAr: data?.contentAr?.[0] || { heading: "", description: "", link: "" },
      });
    }
  }, [data, form, isModalVisible]);

  return (
    <div>
      <Button onClick={showModal} type="default" icon={<EditFilled />}>
        {t("edit")}
      </Button>

      <Modal
        title={t("edit section")}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label={t("name")} name="name">
            <Input placeholder={t("NewsLetter.placeholders.EnterContent")} />
          </Form.Item>

          <Form.Item label={t("contentEn")}> 
            <Input.Group>
              <Form.Item name={["contentEn", "heading"]} label={t("heading")}> 
                <Input placeholder={t("Enter heading")}/>
              </Form.Item>
              <Form.Item name={["contentEn", "description"]} label={t("description")}> 
                <Input placeholder={t("Enter description")}/>
              </Form.Item>
              <Form.Item name={["contentEn", "link"]} label={t("link")}> 
                <Input placeholder={t("Enter link")}/>
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item label={t("contentAr")}> 
            <Input.Group>
              <Form.Item name={["contentAr", "heading"]} label={t("heading")}> 
                <Input placeholder={t("Enter heading")}/>
              </Form.Item>
              <Form.Item name={["contentAr", "description"]} label={t("description")}> 
                <Input placeholder={t("Enter description")}/>
              </Form.Item>
              <Form.Item name={["contentAr", "link"]} label={t("link")}> 
                <Input placeholder={t("Enter link")}/>
              </Form.Item>
            </Input.Group>
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
            label={t("is active")}
            name="isActive"
            rules={[{ required: true, message: t("is active is required.") }]}
          >
            <Select placeholder={t("Select status")}>
              <Select.Option value="1">{t("done")}</Select.Option>
              <Select.Option value="0">{t("no")}</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};