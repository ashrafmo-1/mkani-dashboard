import { FastBackwardOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useEditBlogHook } from "./hooks/useEditBlogHook";
import { useBlog_categoriesHook } from "../blog_categories/hooks/useBlog_categoriesHook";
import { useGetBlogsHook } from "./hooks/useGetBlogsHook";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { MAINPATH } from "../../constant/MAINPATH";
import { Description, MetaDataAr, MetaDataEn, Slug, TextEditorInput, Title } from "../../common";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css"; 

export const EditBlog = () => {
  const { t, i18n } = useTranslation();
  const { blogId } = useParams();
  const { editBlog } = useEditBlogHook();
  const { blogCategories } = useBlog_categoriesHook();
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  const { data } = useGetBlogsHook(blogId);

  const handleSubmit = () => {
    setIsPending(true);
    form.validateFields().then((values) => {
        editBlog({ blogId: blogId, values },
          {
            onSuccess: () => {
              setIsPending(false);
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
              } else {
                toast.error(errorMessage || "Failed to edit customer.");
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
      form.setFieldsValue({
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        slugAr: data.slugAr,
        slugEn: data.slugEn,
        contentAr: data.contentAr,
        contentEn: data.contentEn,
        descriptionAr: data.descriptionAr,
        descriptionEn: data.descriptionEn,
        metaDataAr: data.metaDataAr,
        metaDataEn: data.metaDataEn,
        thumbnail: data.thumbnail ? [{ url: data.thumbnail }] : [],
        categoryId: data.categoryId,
        isPublished:
          data.isPublished !== undefined ? String(data.isPublished) : "",
      });
    }
  }, [data, form]);

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl capitalize">{t("blogs.edit")}</h1>
        <Link to={`/${MAINPATH}/${i18n.language}/blogs`}>
          <Button type="primary">
            <FastBackwardOutlined /> {t("all blog")}
          </Button>
        </Link>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Title
          LabletitleAr="blog arabic title"
          LabletitleEn={"blog english title"}
        />
        <Description />
        <Slug />

        <TextEditorInput />

        <Row gutter={[16, 16]}>
          <MetaDataEn />
          <MetaDataAr />
        </Row>

        {/* thumbnail */}
        <Form.Item
          name="thumbnail"
          valuePropName="fileList"
          label={t("blogs.add.lables.thumbnail")}
          rules={[
            {
              required: true,
              message: t("blogs.add.lables.thumbnail") + " is required.",
            },
          ]}
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList ? e.fileList : [];
          }}
        >
          <Upload
            listType="picture"
            beforeUpload={() => false}
            maxCount={1}
            fileList={
              Array.isArray(form.getFieldValue("thumbnail"))
                ? form.getFieldValue("thumbnail")
                : []
            }
            onChange={({ fileList }) => {
              form.setFieldsValue({ thumbnail: fileList });
            }}
          >
            <Button icon={<UploadOutlined />}>
              {t("blogs.add.placeholder.EnterThumbnail")}
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item label={t("blogs.add.lables.isPublished")} name="isPublished">
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

        <Form.Item label={t("blogs.add.lables.categoryId")} name="categoryId">
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
          {t("blogs.edit")}
        </Button>
      </Form>
    </div>
  );
};
