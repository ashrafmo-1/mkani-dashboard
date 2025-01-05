import { PlusSquareFilled, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { useAddProductCategoryHook } from "./hooks/useAddProductCategoryHook";
import { useTranslation } from "react-i18next";

export const AddNewProductCategeory = () => {
  const { t } = useTranslation();
  const { addProductCategory } = useAddProductCategoryHook();
  const hasCreateUserPermission = checkPermission("create_customer");
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (form_data) => {
    try {
      setIsPending(true);
      await addProductCategory(form_data);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error(t("productCategory.add.errorMessage"));
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      {hasCreateUserPermission && (
        <Button onClick={showModal} type="primary">
          <PlusSquareFilled />
          {t("productCategory.add.title")}
        </Button>
      )}

      <Modal
        title={t("productCategory.add.title")}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("productCategory.add.lables.nameEN")}
                name="nameEn"
                rules={[
                  {
                    required: true,
                    message:
                      t("productCategory.add.lables.nameEN") + " is required.",
                  },
                ]}
              >
                <Input
                  placeholder={t("productCategory.add.placeholder.EnterName")}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("productCategory.add.lables.nameAR")}
                name="nameAr"
                rules={[
                  {
                    required: true,
                    message: t("lables.nameAR") + " is required.",
                  },
                ]}
              >
                <Input
                  placeholder={t("productCategory.add.placeholder.EnterName")}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label={t("globals.status.checkActive")}
            name="isActive"
            rules={[
              {
                required: true,
                message:
                  t("productCategory.add.lables.isActive") + " is required.",
              },
            ]}
          >
            <Select placeholder={t("globals.status.checkActive")}>
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
            {t("productCategory.add.title")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
