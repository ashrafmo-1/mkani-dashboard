import { Button, Modal, Form, Input, Row, Col, Select, Upload } from "antd";
import React, { useState } from "react";
import { PlusSquareFilled, UploadOutlined } from "@ant-design/icons";
import { useBlog_categoriesHook } from "../blog_categories/hooks/useBlog_categoriesHook";
import { useAddNewBlog } from "./hooks/useAddNewBlog";
import { useTranslation } from "react-i18next";
export const AddBlog = () => {
  const { t } = useTranslation();
  const { addNewBlog } = useAddNewBlog();
  const { blogCategories } = useBlog_categoriesHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setIsPending(true);
    await addNewBlog(values);
    setIsPending(false);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        <PlusSquareFilled />
        {t("blogs.add.title")}
      </Button>

      <Modal
        title={t("blogs.add.title")}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("blogs.add.lables.titleAr")}
                name="titleAr"
                rules={[{ required: true, message: t("blogs.add.lables.titleAr") + " is required." }]}
              >
                <Input placeholder={t("blogs.add.placeholder.EnterTitleAr")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("blogs.add.lables.titleEn")}
                name="titleEn"
                rules={[{ required: true, message: t("blogs.add.lables.titleEn") + " is required." }]}
              >
                <Input placeholder={t("blogs.add.placeholder.EnterTitleEn")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("blogs.add.lables.slugAr")}
                name="slugAr"
                rules={[{ required: true, message: t("blogs.add.lables.slugAr") + " is required." }]}
              >
                <Input placeholder={t("blogs.add.placeholder.EnterSlugAr")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("blogs.add.lables.slugEn")}
                name="slugEn"
                rules={[{ required: true, message: t("blogs.add.lables.slugEn") + " is required." }]}
              >
                <Input placeholder={t("blogs.add.placeholder.EnterSlugEn")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("blogs.add.lables.contentAr")}
                name="contentAr"
                rules={[{ required: true, message: t("blogs.add.lables.contentAr") + " is required." }]}
              >
                <Input placeholder={t("blogs.add.placeholder.EnterContentAr")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("blogs.add.lables.contentEn")}
                name="contentEn"
                rules={[{ required: true, message: t("blogs.add.lables.contentEn") + " is required." }]}
              >
                <Input placeholder={t("blogs.add.placeholder.EnterContentEn")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("blogs.add.lables.metaDataAr")}
                name="metaDataAr"
                rules={[{ required: true, message: t("blogs.add.lables.metaDataAr") + " is required." }]}
              >
                <Input placeholder={t("blogs.add.placeholder.EnterMetaDataAr")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("blogs.add.lables.metaDataEn")}
                name="metaDataEn"
                rules={[{ required: true, message: t("blogs.add.lables.metaDataEn") + " is required." }]}
              >
                <Input placeholder={t("blogs.add.placeholder.EnterMetaDataEn")} />
              </Form.Item>
            </Col>
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
                rules={[{ required: true, message: t("blogs.add.lables.thumbnail") + " is required." }]}
              >
                <Upload listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>{t("blogs.add.placeholder.EnterThumbnail")}</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={t("blogs.add.lables.isPublished")}
            name="isPublished"
            rules={[{ required: true, message: t("blogs.add.lables.isPublished") + " is required." }]}
          >
            <Select placeholder={t("blogs.add.placeholder.isPublished")}>
              <Select.Option value="1">{t("blogs.add.placeholder.isPublished")}</Select.Option>
              <Select.Option value="0">{t("blogs.add.placeholder.Draft")}</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={t("blogs.add.lables.categoryId")}
            name="categoryId"
            rules={[{ required: true, message: t("blogs.add.lables.categoryId") + " is required." }]}
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
            className="w-full"
            loading={isPending}
          >
            {t("blogs.add.title")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};