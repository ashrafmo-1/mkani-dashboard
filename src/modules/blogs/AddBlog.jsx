import { Button, Form, Row, Col, Select, Upload } from "antd";
import React, { useState } from "react";
import { BackwardFilled, UploadOutlined } from "@ant-design/icons";
import { useBlog_categoriesHook } from "../blog_categories/hooks/useBlog_categoriesHook";
import { useAddNewBlog } from "./hooks/useAddNewBlog";
import { useTranslation } from "react-i18next";
import { Description, MetaDataAr, MetaDataEn, Slug, TextEditorInput, Title } from "../../common";
import { Link } from "react-router-dom";
import { MAINPATH } from "../../constant/MAINPATH";
import { toast } from "react-toastify";

export const AddBlog = () => {
  const { t, i18n } = useTranslation();
  const { addNewBlog } = useAddNewBlog();
  const { blogCategories } = useBlog_categoriesHook();
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    setIsPending(true);
    form.validateFields().then(async (form_data) => {
        const formData = new FormData();

        if (form_data.thumbnail) {
          formData.append(
            "thumbnail",
            form_data.thumbnail.file || form_data.thumbnail
          );
        } else {
          formData.append("thumbnail", "");
        }

        addNewBlog(formData, {
          onSuccess: () => {
            setIsPending(false);
          },
          onError: (error) => {
            setIsPending(false);
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === "object") {
              for (const [messages] of Object.entries(errorMessage)) {
                messages.forEach((msg) => {
                  toast.error(msg);
                });
              }
            } else {
              toast.error(errorMessage || "Failed to add blog.");
            }
          },
        });
      })
      .catch((errorInfo) => {
        setIsPending(false);
        console.log("Validate Failed:", errorInfo);
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl capitalize">
          {t("blogs.add.title")} {"new blog"}
        </h1>
        <Link to={`/${MAINPATH}/${i18n.language}/blogs`}>
          <Button type="primary">
            <BackwardFilled />
            {"all blogs"}
          </Button>
        </Link>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Title
          LabletitleAr={"blog arabic title"}
          LabletitleEn={"blog english title"}
        />
        <Slug />
        <Description />
        <TextEditorInput />

        <Row gutter={[16, 16]}>
          <MetaDataAr />
          <MetaDataEn />
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label={t("blogs.add.lables.thumbnail")}
              name="thumbnail"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
              rules={[
                {
                  required: true,
                  message: t("blogs.add.lables.thumbnail") + " is required.",
                },
              ]}
            >
              <Upload listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>
                  {t("blogs.add.placeholder.EnterThumbnail")}
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={t("blogs.add.lables.isPublished")}
          name="isPublished"
          rules={[
            {
              required: true,
              message: t("blogs.add.lables.isPublished") + " is required.",
            },
          ]}
        >
          <Select placeholder={t("blogs.add.placeholder.isPublished")}>
            <Select.Option value="1">
              <div className="flex items-center gap-1">
                <span className="bg-green-600 p-1 rounded-full"></span>
                <span>{t("globals.status.active")}</span>
              </div>
            </Select.Option>
            <Select.Option value="0">
              <div className="flex items-center gap-1">
                <span className="bg-red-600 p-1 rounded-full"></span>
                <span>{t("globals.status.inActive")}</span>
              </div>
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={t("blogs.add.lables.categoryId")}
          name="categoryId"
          rules={[
            {
              required: true,
              message: t("blogs.add.lables.categoryId") + " is required.",
            },
          ]}
        >
          <Select placeholder={t("blogs.add.placeholder.SelectCategory")}>
            {blogCategories.map((category, index) => (
              <Select.Option value={category.blogCategoryId} key={index}>
                {category.name}
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
          {t("blogs.add.title")}
        </Button>
      </Form>
    </div>
  );
};
