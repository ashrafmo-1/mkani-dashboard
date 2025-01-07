import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import { EditFilled, UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useGetSinglePortfolioSectionHook } from "../hooks/useGetSinglePortfolioSectionHook";
import { useEditPortfolioSectionHook } from "../hooks/useEditPortfolioSectionHook";

export const EditPortfolioSection = ({ frontPageSectionId }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { data } = useGetSinglePortfolioSectionHook(frontPageSectionId);
  const { editPortfolioSections } = useEditPortfolioSectionHook();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await editPortfolioSections(frontPageSectionId, values);
      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getValueFromEvent = (e) => {
    const isValidFile = (file) =>
      ["image/png", "image/jpeg"].includes(file.type) && file.size <= 2 * 1024 * 1024;
    return e && e.fileList
      ? e.fileList.filter((file) => isValidFile(file.originFileObj)).map((file) => file.originFileObj)
      : [];
  };

  const renderDynamicTableInputs = (contentKey, data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return (
      <div>
        <h4>{t(`${contentKey} Table`)}</h4>
        {data.map((row, rowIndex) => (
          <div key={`${contentKey}-${rowIndex}`} className="border p-3 mb-3 rounded-lg">
            {Object.keys(row).map((field, fieldIndex) => (
              <Form.Item key={`${contentKey}-${rowIndex}-${field}`} name={[contentKey, rowIndex, field]} label={t(field)}>
                <Input placeholder={t(`Enter ${field}`)} defaultValue={row[field]} />
              </Form.Item>
            ))}
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        name: data?.name || "",
        isActive: data?.isActive ? "1" : "0",
        contentEn: data?.contentEn || [],
        contentAr: data?.contentAr || [],
      });
    }
  }, [data, form, isModalVisible]);

  return (
    <div>
      <Button onClick={showModal} type="default" icon={<EditFilled />}>
        {t("edit")}
      </Button>

      <Modal title={t("edit section")} footer={null} visible={isModalVisible} onCancel={handleCancel}>
        <Form layout="vertical" form={form}>
          <Form.Item label={t("name")} name="name">
            <Input placeholder={t("NewsLetter.placeholders.EnterContent")} />
          </Form.Item>

          {renderDynamicTableInputs("contentEn", data?.contentEn)}

          {renderDynamicTableInputs("contentAr", data?.contentAr)}

          <Form.Item label={t("upload images")} name="images" valuePropName="fileList" getValueFromEvent={getValueFromEvent}>
            <Upload
              name="images"
              listType="picture"
              beforeUpload={() => false}
              multiple
            >
              <Button icon={<UploadOutlined />}>{t("globals.upload")}</Button>
            </Upload>
          </Form.Item>

          <Form.Item label={t("is active")} name="isActive" rules={[{ required: true, message: t("is active is required.") }]}>
            <Select placeholder={t("Select status")}>
              <Select.Option value="1">{t("done")}</Select.Option>
              <Select.Option value="0">{t("no")}</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleOk}>
              {t("handle")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};