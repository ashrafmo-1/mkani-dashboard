import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal, Select, message, Row, Col } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useGetBlogCategoryHook } from "./hooks/useGetBlogCategoryHook";
import { useEditBolgCategoryHook } from "./hooks/useEditBolgCategoryHook";
import { useTranslation } from "react-i18next";

export const EditBlogCategories = ({ blogCategoryId }) => {
  const { t } = useTranslation();
  const { editUser } = useEditBolgCategoryHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();
  const { data } = useGetBlogCategoryHook(blogCategoryId);

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
      await editUser(blogCategoryId, formData);
      setIsModalVisible(false);
      message.success(t("blogCategory.edit.success"));
    } catch (error) {
      message.error(t("blogCategory.edit.error"));
      console.error("Error editing blog category:", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        nameEn: data?.nameEn || "",
        nameAr: data?.nameAr || "",
        slugAr: data?.slugAr || "",
        slugEn: data?.slugEn || "",
        isActive: data?.isActive !== undefined ? String(data.isActive) : "",  
      });
    }
  }, [data, form, isModalVisible]);

  return (
    <div>
      <Button onClick={showModal} className="text-green-800">
        <EditFilled />
      </Button>

      <Modal
        title={t("blogCategory.edit")}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label={t("blogCategory.lables.nameEn")} name="nameEn">
                <Input placeholder={t("blogCategory.placeholder.EnterNameEn")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t("blogCategory.lables.nameAr")} name="nameAr">
                <Input placeholder={t("blogCategory.placeholder.EnterNameAr")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label={t("blogCategory.lables.slugEn")} name="slugEn">
                <Input placeholder={t("blogCategory.placeholder.EnterSlugEn")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t("blogCategory.lables.slugAr")} name="slugAr">
                <Input placeholder={t("blogCategory.placeholder.EnterSlugAr")} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label={t("blogCategory.lables.isActive")} name="isActive">
            <Select placeholder={t("blogCategory.placeholder.SelectIsActive")} aria-label="isActive">
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

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            {t("blogCategory.edit")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
