import { EditOutlined, UploadOutlined } from "@ant-design/icons";
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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checkPermission } from "../../helpers/checkPermission";
import { useEditProductCategoryHook } from "./hooks/useEditProductCategoryHook";
import { useGetProductCategory } from "./hooks/useGetProductCategory";

export const EditProductCategory = ({ productCategoryId }) => {
  const hasCreateUserPermission = checkPermission("create_customer");
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { editProductCategory } = useEditProductCategoryHook();
  const { data } = useGetProductCategory(productCategoryId);

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
      await editProductCategory(productCategoryId, values);
      message.success("Product category edited successfully.");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to edit product category.", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        isActive: data.isActive,
      });
    }
  }, [data, form, isModalVisible]);

  return (
    <div>
      {hasCreateUserPermission && (
        <Button className="edit" onClick={showModal}>
          <EditOutlined />
        </Button>
      )}

      <Modal
        title={t("products.add.title")}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="name english" name="nameEn">
                <Input placeholder="Enter name english" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="name arabic" name="nameAr">
                <Input placeholder="Enter name arabic" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="is active" name="isActive">
            <Select placeholder="Select status">
              <Select.Option value="1">done</Select.Option>
              <Select.Option value="0">no</Select.Option>
            </Select>
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Thumbnail"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
              >
                <Upload listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            {"Add New Product"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
