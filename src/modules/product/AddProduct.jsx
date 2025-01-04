import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { Button, Form, message, Modal, Row } from "antd";
import { useAddProductHook } from "./hook/useAddProductHook";
import { PlusSquareFilled } from "@ant-design/icons";
import { InputName } from "./components/create/InputName";
import { UploadImages } from "./components/create/UploadImages";
import { SelectisActive } from "./components/create/SelectisActive";
import { useTranslation } from "react-i18next";
import { MetaDataEn } from "../../common/modules/create-edit/MetaDataEn";
import { MetaDataAr } from "../../common/modules/create-edit/MetaDataAr";
import { Slug } from "../../common/modules/create-edit/Slug";
import { Description, TextEditorInput } from "../../common";

const AddProduct = () => {
  const { t } = useTranslation();
  const { addProduct } = useAddProductHook();
  const hasCreateUserPermission = checkPermission("create_customer");
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (form_data) => {
    const formData = new FormData();
  

    if (form_data.images && form_data.images.length > 0) {
      form_data.images.forEach((image, index) => {
        formData.append(`images[${index}][path]`, image.file || image);
      });
    } else {
      formData.append("images", "");
    }

    formData.append('nameEn', form_data.nameEn || "");
    formData.append('nameAr', form_data.nameAr || "");
    formData.append('descriptionEn', form_data.descriptionEn || "");
    formData.append('descriptionAr', form_data.descriptionAr || "");
    formData.append('slugEn', form_data.slugEn || "");
    formData.append('slugAr', form_data.slugAr || "");
    formData.append('contentEn', form_data.contentEn || "");
    formData.append('contentAr', form_data.contentAr || "");
    formData.append('metaDataEn[]', JSON.stringify(form_data.metaDataEn || []));
    formData.append('metaDataAr[]', JSON.stringify(form_data.metaDataAr || []));
    formData.append('isActive', form_data.isActive ? 1 : 0);
  
    try {
      setIsPending(true);
      await addProduct(formData);;
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Failed to send form. Please try again.");
      }
    } finally {
      setIsPending(false);
    }
  };
  

  return (
    <div className="">
      {hasCreateUserPermission && (
        <Button onClick={showModal} type="primary">
          <PlusSquareFilled />
          {t("products.add.title")}
        </Button>
      )}

      <Modal title={t("products.add.title")} footer={null} visible={isModalVisible} onCancel={handleCancel} width={1440}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <InputName />
          <Description />
          <TextEditorInput />
          <Slug />

          <Row gutter={[16, 16]}>
            <MetaDataEn />
            <MetaDataAr />
          </Row>

          <UploadImages />
          <SelectisActive />
          <Button type="primary" htmlType="submit" className="w-full" loading={isPending}>
            {t("products.add.title")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProduct;