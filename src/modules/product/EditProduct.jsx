import { Button, Form, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { InputName } from "./components/create/InputName";
import { UploadImages } from "./components/create/UploadImages";
import { SelectisActive } from "./components/create/SelectisActive";
import { useTranslation } from "react-i18next";
import { useEditProductHook } from "./hook/useEditProductHook";
import { useGetSingleProduct } from "./hook/useGetSingleProduct";
import { MetaDataEn, MetaDataAr, Slug, Description, TextEditorInput } from "../../common";
import { BackwardFilled } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { MAINPATH } from "../../constant/MAINPATH";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { productId } = useParams();
  const { t, i18n } = useTranslation();
  const { editProduct } = useEditProductHook();
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const { data } = useGetSingleProduct(productId);

  const handleSubmit = async (values) => {
    setIsPending(true);
    try {
      await editProduct(productId, values);
    } catch (error) {
      toast.error("Failed to edit product.", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (data) {
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
        isActive: data.isActive !== undefined ? String(data.isActive) : "",
        images: data.images && data.images.length > 0 ? data.images.map((image, index) => ({
          path: image.file || image
        })) : [],
      });
    }
  }, [data, form]);

  return (
    <div className="edit-product-page">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl capitalize">
          {t("globals.edit")} Product
        </h1>
        <Link to={`/${MAINPATH}/${i18n.language}/products`}>
          <Button type="primary">
            <BackwardFilled />
            {"all products"}
          </Button>
        </Link>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <InputName />
        <Description />
        <TextEditorInput />
        <Slug />

        <Row gutter={[16, 16]}>
          <MetaDataEn
            value={form.getFieldValue("metaDataEn")}
            onChange={(updatedValue) =>
              form.setFieldsValue({ metaDataEn: updatedValue })
            }
          />
          <MetaDataAr />
        </Row>

        <UploadImages />
        <SelectisActive />
        <Button
          type="primary"
          htmlType="submit"
          className="mb-8"
          loading={isPending}
        >
          {t("globals.edit")}
        </Button>
      </Form>
    </div>
  );
};

export default EditProduct;
