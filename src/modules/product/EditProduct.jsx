import { Button, Form, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { InputName } from "./components/create/InputName";
import { SelectisActive } from "./components/create/SelectisActive";
import { useTranslation } from "react-i18next";
import { useEditProductHook } from "./hook/useEditProductHook";
import { useGetSingleProduct } from "./hook/useGetSingleProduct";
import { MetaDataEn, MetaDataAr, Slug, Description, TextEditorInput } from "../../common";
import { BackwardFilled } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { MAINPATH } from "../../constant/MAINPATH";
import { toast } from "react-toastify";
import { UploadImages } from "./components/create/UploadImages";
import { SelectMediaType } from "./components/create/SelectMediaType";
import { useProductsCategoryHook } from "../product-category/hooks/useProductsCategoryHook";

const EditProduct = () => {
  const { productId } = useParams();
  const { t, i18n } = useTranslation();
  const { editProduct } = useEditProductHook();
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const { data } = useGetSingleProduct(productId);
  const { productCategories } = useProductsCategoryHook();

  const handleSubmit = async () => {
    setIsPending(true);
    form.validateFields().then((values) => {
        console.log(values);
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === "images") {
            if (value && value.length > 0) {
              value.forEach((file, index) => {
                if (file.originFileObj) {
                  formData.append(`images[${index}][path]`, file.originFileObj);
                } else {
                  formData.append(`images[${index}][path]`, file.path);
                }
              });
            }
          } else {
            formData.append(key, value);
          }
        });
  

        formData.append("metaDataEn[title]", values.metaDataEn?.title || "");
        formData.append(
          "metaDataEn[description]",
          values.metaDataEn?.description || ""
        );
        if (
          values.metaDataEn?.keywords &&
          values.metaDataEn.keywords.length > 0
        ) {
          values.metaDataEn.keywords.forEach((keyword, index) => {
            formData.append(`metaDataEn[keywords][${index}]`, keyword);
          });
        } else {
          formData.append("metaDataEn[keywords]", "");
        }
        formData.append("metaDataAr[title]", values.metaDataAr?.title || "");
        formData.append(
          "metaDataAr[description]",
          values.metaDataAr?.description || ""
        );
        if (
          values.metaDataAr?.keywords &&
          values.metaDataAr.keywords.length > 0
        ) {
          values.metaDataAr.keywords.forEach((keyword, index) => {
            formData.append(`metaDataAr[keywords][${index}]`, keyword);
          });
        } else {
          formData.append("metaDataAr[keywords]", "");
        }

        formData.append("type", values.type);

        editProduct(
          { productId, values: formData },
          {
            onSuccess: () => {
              setIsPending(false);
              toast.success("Product updated successfully!");
            },
            onError: (error) => {
              setIsPending(false);
              const errorMessage = error.response?.data?.message;
              if (typeof errorMessage === "object") {
                Object.entries(errorMessage).forEach(([field, messages]) => {
                  messages.forEach((msg) => {
                    toast.error(msg);
                  });
                });
              }
            },
            onSettled: () => {
              setIsPending(false);
            },
          }
        );
      })
      .catch((errorInfo) => {
        setIsPending(false);
        console.log("Validate Failed:", errorInfo);
      });
  };

  useEffect(() => {
    if (data) {
      console.log(data.image);
      
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
        productCategoryId: data.productCategoryId,
        // type: data.type === 'video' ? 1 : 0,
        images: data?.images?.map((image) => ({
          uid: image.imageId,
          name: image.path.split("/").pop(),
          status: "done",
          url: image.path,
          imageId: image.imageId,
          path: image.path,
          type: image.type !== undefined ? String(image.type) : "",
        })),
        type: data.type,
      });
    }
  }, [data, form]);

  return (
    <div className="edit-product-page">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl capitalize">{t("globals.edit")} Product</h1>
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
        <SelectMediaType />
        <UploadImages isEdit={true} />

        <SelectisActive />
        <Form.Item
          label="product category"
          name="productCategoryId"
          rules={[{ required: true, message: t("value") + " is required." }]}
        >
          <Select placeholder="Select status">
            {productCategories.map((product, index) => (
              <Select.Option value={product.productCategoryId} key={index}>
                {product.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
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
