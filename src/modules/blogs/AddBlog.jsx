import { Button, Modal, Form, Row, Col, Select, Upload } from "antd";
import React, { useState } from "react";
import { PlusSquareFilled, UploadOutlined } from "@ant-design/icons";
import { useBlog_categoriesHook } from "../blog_categories/hooks/useBlog_categoriesHook";
import { useAddNewBlog } from "./hooks/useAddNewBlog";
import { useTranslation } from "react-i18next";
import {
  MetaDataAr,
  MetaDataEn,
  Slug,
  TextEditorInput,
  Title,
} from "../../common";

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
        <PlusSquareFilled /> {t("blogs.add.title")}
      </Button>

      <Modal
        title={t("blogs.add.title")}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={820}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Title />
          <Slug />
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
