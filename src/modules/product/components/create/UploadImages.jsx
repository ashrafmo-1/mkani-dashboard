import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Upload } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteProductImageHook } from "../../hook/useDeleteProductImageHook";

export const UploadImages = ({ isEdit }) => {
  const { t } = useTranslation();
  const { deleteProductPhoto } = useDeleteProductImageHook();
  const [isModalVisible, setIsModalVisible] = useState(false); // حالة لعرض/إخفاء الـ Modal
  const [fileToDelete, setFileToDelete] = useState(null);
  
  const normFile = (e) => {
    if (!e || !e.fileList) {
      return [];
    }

    return e.fileList;
  };


  // عرض الـ Modal عند الضغط على زر الحذف
  const handleRemove = (file) => {
    setFileToDelete(file); // حفظ الصورة المحددة للحذف
    setIsModalVisible(true); // عرض الـ Modal
    return false; // منع الحذف المباشر
  };

  // تأكيد الحذف
  const handleConfirmDelete = async () => {
    if (fileToDelete) {
      try {
        await deleteProductPhoto(fileToDelete.uid); // تنفيذ عملية الحذف باستخدام الـ API
        setIsModalVisible(false); // إخفاء الـ Modal بعد الحذف
        setFileToDelete(null); // مسح الصورة المحددة
      } catch (error) {
        console.error("Failed to delete image", error);
      }
    }
  };

  // إلغاء الحذف
  const handleCancelDelete = () => {
    setIsModalVisible(false); // إخفاء الـ Modal
    setFileToDelete(null); // مسح الصورة المحددة
  };

  return (
    <>
      <Form.Item
        name="images"
        label={t("Upload Images")}
        {...(isEdit ? { valuePropName: "fileList" } : "")}
        {...(isEdit ? { getValueFromEvent: normFile } : "")}
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
          onRemove={handleRemove} // تنفيذ handleRemove عند الضغط على زر الحذف
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
    </>
  );
};
