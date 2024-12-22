import { EditOutlined } from "@ant-design/icons";
import { Button, Form, message, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import { InputName } from "./components/create/InputName";
import { InputDescription } from "./components/create/InputDescription";
import { InputContent } from "./components/create/InputContent";
import { InputSlug } from "./components/create/InputSlug";
import { InputmetaDataEn } from "./components/create/InputmetaDataEn";
import { InputmetaDataAr } from "./components/create/InputmetaDataAr";
import { UploadImages } from "./components/create/UploadImages";
import { SelectisActive } from "./components/create/SelectisActive";
import { checkPermission } from "../../helpers/checkPermission";
import { useTranslation } from "react-i18next";
import { useEditProductHook } from "./hook/useEditProductHook";
import { useGetSingleProduct } from "./hook/useGetSingleProduct";

const EditProduct = ({ productId }) => {
  const { t } = useTranslation();
  const { editProduct } = useEditProductHook();
  const hasCreateUserPermission = checkPermission("create_customer");
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data } = useGetSingleProduct(productId);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setIsPending(true);
    try {
      await editProduct(productId, values);
      message.success("Product edited successfully.");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to edit product.", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        contentEn: data.contentEn,
        contentAr: data.contentAr,
        slugEn: data.slugEn,
        slugAr: data.slugAr,
        metaDataEn: data.metaDataEn,
        metaDataAr: data.metaDataAr,
        isActive: data.isActive,
      });
    }
  }, [data, form, isModalVisible]);

  return (
    <div>
      {hasCreateUserPermission && (
        <Button className="edit" onClick={showModal}>
          <EditOutlined />
        </Button>
      )}

      <Modal
        title={t("products.add.title")}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
        width={1440}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <InputName />
          <InputDescription />
          <InputContent />
          <InputSlug />

          <Row gutter={[16, 16]}>
            <InputmetaDataEn />
            <InputmetaDataAr />
          </Row>

          <UploadImages />
          <SelectisActive />
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            {t("products.add.title")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default EditProduct;