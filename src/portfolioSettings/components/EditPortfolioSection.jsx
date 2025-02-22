import React from "react";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useEditPortfolioSectionHook } from "../hooks/useEditPortfolioSectionHook";
import { useState } from "react";
import { useDeleteImageHook } from "../hooks/useDeleteImageHook";

export const EditPortfolioSection = ({ frontPageSectionId, form, sectionData, setSectionData, isModalVisibleTow, setIsModalVisibleTow }) => {
  const { t } = useTranslation();
  const { editPortfolioSections } = useEditPortfolioSectionHook();
  const {deletePortfolioImage} = useDeleteImageHook()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const handleRemove = (file) => {
    const fileWithImageId = { ...file, imageId: file.uid};
    setFileToDelete(fileWithImageId);
    console.log('File to delete:', fileWithImageId);
    setIsModalVisible(true);
    return false;
  };

  const handleConfirmDelete = async () => {
    if (fileToDelete) {
      try {
        await deletePortfolioImage(fileToDelete.uid);
        setIsModalVisible(false);
        setFileToDelete(null);
      } catch (error) {
        console.error("Failed to delete image", error);
      }
    }
  };

    const handleCancelDelete = () => {
      setIsModalVisible(false);
      setFileToDelete(null);
    };
  
  const handleCancel = () => {
    setIsModalVisibleTow(false);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const newValues = {
        ...values,
        _method: 'PUT',
        images: values?.images?.fileList ? values?.images?.fileList?.filter((image) => image?.originFileObj)?.map((image) => {
          return {
            imageId: image?.uid,
            path: image?.originFileObj || image?.path,
          };
        }) : []
      }
      await editPortfolioSections(frontPageSectionId, newValues);
      setIsModalVisibleTow(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderDynamicTableInputs = (contentKey, data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p>{t("No data available")}</p>;
    }

    return (
      <div>
        <h4>{t(`${contentKey} Table`)}</h4>
        {data.map((row, rowIndex) => (
          <div key={`${contentKey}-${rowIndex}`} className="border p-3 mb-3 rounded-lg">
            {Object.keys(row).map((field) => (
              <Form.Item key={`${contentKey}-${rowIndex}-${field}`} name={[contentKey, rowIndex, field]} label={t(field)}>
                <Input placeholder={t(`Enter ${field}`)} />
              </Form.Item>
            ))}
          </div>
        ))}
      </div>
    );
  };


  return (
    <div>
      <Modal title={t("edit section")} visible={isModalVisibleTow} onCancel={handleCancel} footer={null}>
        <Form layout="vertical" form={form}>
          <Form.Item label={t("name")} name="name">
            <Input placeholder={t("NewsLetter.placeholders.EnterContent")} disabled />
          </Form.Item>

          {renderDynamicTableInputs("contentEn", sectionData?.contentEn)}
          {renderDynamicTableInputs("contentAr", sectionData?.contentAr)}

          <Form.Item label={t("images")} name="images">
            <Upload
              name="images"
              listType="picture"
              beforeUpload={() => false}
              multiple
              onRemove={handleRemove}
              defaultFileList={
                sectionData?.images?.map((image, index) => ({
                  uid: image.id || index,
                  name: image.name,
                  status: "done",
                  url: image.path,
                  key: image.id || index,
                })) || []
              }
            >
              <Button icon={<UploadOutlined />}>{t("upload")}</Button>
            </Upload>
          </Form.Item>

                {/* Modal لتأكيد الحذف */}
            <Modal
              title={t("Confirm Delete")}
              visible={isModalVisible}
              onOk={handleConfirmDelete}
              onCancel={handleCancelDelete}
              okText={t("Delete")}
              cancelText={t("Cancel")}
            >
              <p>{t("Are you sure you want to delete this image?")}</p>
            </Modal>

          <Form.Item label={t("is active")} name="isActive" rules={[{ required: true, message: t("is active is required.") }]}>
            <Select placeholder={t("Select status")}>
              <Select.Option value="1">{t("done")}</Select.Option>
              <Select.Option value="0">{t("no")}</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleOk}>
              {t("save")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};