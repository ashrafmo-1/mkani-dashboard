import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useEditBlogHook } from "./hooks/useEditBlogHook";
import { useBlog_categoriesHook } from "../blog_categories/hooks/useBlog_categoriesHook";
import { useGetBlogsHook } from "./hooks/useGetBlogsHook";
import { useTranslation } from "react-i18next";

export const EditBlog = ({ blogId }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { editBlog } = useEditBlogHook();
  const { blogCategories } = useBlog_categoriesHook();
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  const { data } = useGetBlogsHook(blogId);

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
      await editBlog(blogId, values);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to edit blog:", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        slugAr: data.slugAr,
        slugEn: data.slugEn,
        contentAr: data.contentAr,
        contentEn: data.contentEn,
        metaDataAr: data.metaDataAr,
        metaDataEn: data.metaDataEn,
        thumbnail: data.thumbnail,
        categoryId: data.categoryId,
        isPublished:
          data.isPublished !== undefined ? String(data.isPublished) : "",
      });
    }
  }, [data, form, isModalVisible]);

  return (
    <div>
      <Button onClick={showModal}>
        <EditOutlined className="text-green-700" />
      </Button>

      <Modal
        title={t("blogs.edit")}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label={t("blogs.add.lables.titleAr")} name="titleAr">
                <Input placeholder={t("blogs.add.placeholder.EnterTitleAr")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={t("blogs.add.lables.titleEn")} name="titleEn">
                <Input placeholder={t("blogs.add.placeholder.EnterTitleEn")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label={t("blogs.add.lables.slugAr")} name="slugAr">
                <Input placeholder={t("blogs.add.placeholder.EnterSlugAr")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={t("blogs.add.lables.slugEn")} name="slugEn">
                <Input placeholder={t("blogs.add.placeholder.EnterSlugEn")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("blogs.add.lables.contentAr")}
                name="contentAr"
              >
                <Input
                  placeholder={t("blogs.add.placeholder.EnterContentAr")}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("blogs.add.lables.contentEn")}
                name="contentEn"
              >
                <Input
                  placeholder={t("blogs.add.placeholder.EnterContentEn")}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("blogs.add.lables.metaDataAr")}
                name="metaDataAr"
              >
                <Input
                  placeholder={t("blogs.add.placeholder.EnterMetaDataAr")}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("blogs.add.lables.metaDataEn")}
                name="metaDataEn"
              >
                <Input
                  placeholder={t("blogs.add.placeholder.EnterMetaDataEn")}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("blogs.add.lables.thumbnail")}
                name="thumbnail"
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
            className="w-full"
            loading={isPending}
          >
            {t("blogs.edit")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
