import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";
import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { useAddNewBlogCategory } from "./hooks/useAddNewBlogCategory";
import { PlusSquareFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const AddNewBlog_categories = () => {
  const { t } = useTranslation();
  const hasCreateCategoryPermission = checkPermission("create_blog_category");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  const { addNewBlogCategories } = useAddNewBlogCategory();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (formData) => {
    try {
      setIsPending(true);
      await addNewBlogCategories(formData);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.status) {
        message.error(t("blogCategory.error.invalidStatus"));
      } else {
        console.error("Error adding blog category:", error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      {/* {hasCreateCategoryPermission && ()} */}
      <Button onClick={showModal} type="primary">
        {t("blogCategory.add")}
        <PlusSquareFilled />
      </Button>

      <Modal
        title={t("blogCategory.add")}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("blogCategory.lables.nameEn")}
                name="nameEn"
                rules={[
                  { required: true, message: t("blogCategory.placeholder.EnterNameEn") },
                ]}
              >
                <Input placeholder={t("blogCategory.placeholder.EnterNameEn")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("blogCategory.lables.nameAr")}
                name="nameAr"
                rules={[
                  { required: true, message: t("blogCategory.placeholder.EnterNameAr") },
                ]}
              >
                <Input placeholder={t("blogCategory.placeholder.EnterNameAr")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("blogCategory.lables.slugEn")}
                name="slugEn"
                rules={[
                  { required: true, message: t("blogCategory.placeholder.EnterSlugEn") },
                ]}
              >
                <Input placeholder={t("blogCategory.placeholder.EnterSlugEn")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("blogCategory.lables.slugAr")}
                name="slugAr"
                rules={[
                  { required: true, message: t("blogCategory.placeholder.EnterSlugAr") },
                ]}
              >
                <Input placeholder={t("blogCategory.placeholder.EnterSlugAr")} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={t("blogCategory.lables.isActive")}
            name="isActive"
            rules={[{ required: true, message: t("blogCategory.placeholder.SelectIsActive") }]}
          >
            <Select placeholder={t("blogCategory.placeholder.SelectIsActive")} aria-label="isActive">
              <Select.Option value="1">
                <div className="flex items-center gap-1">
                  <span className="bg-green-600 p-2 rounded-full"></span>
                  <span>{t("globals.status.active")}</span>
                </div>
              </Select.Option>
              <Select.Option value="0">
                <div className="flex items-center gap-1">
                  <span className="bg-red-600 p-2 rounded-full"></span>
                  <span>{t("globals.status.inActive")}</span>
                </div>
              </Select.Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full" loading={isPending}>
            {t("blogCategory.add")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
