import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input,  Modal, Row, Select, Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useEditProductCategoryHook } from "./hooks/useEditProductCategoryHook";
import { useGetProductCategory } from "./hooks/useGetProductCategory";
import { toast } from "react-toastify";

export const EditProductCategory = ({ productCategoryId }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { editProductCategory } = useEditProductCategoryHook();
  const { data } = useGetProductCategory(productCategoryId);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    setLoading(true);
    form.validateFields().then((values) => {
        editProductCategory({ productCategoryId, values },{
            onSuccess: () => {
              setLoading(false);
              toast.success("Product updated successfully!");
              handleCancel();
            },
            onError: (error) => {
              setLoading(false);
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
              setLoading(false);
            },
          }
        );
      })
      .catch((errorInfo) => {
        setLoading(false);
        console.log("Validate Failed:", errorInfo);
      });
  };


  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        isActive: data.isActive !== undefined ? String(data.isActive) : "",
        image: data.image ? [{ url: data.image }] : [],
      });
    }
  }, [data, form, isModalVisible]);


  return (
    <div>
        <Button className="edit" onClick={showModal}>
          <EditOutlined />
        </Button>

      <Modal
        title={t("edit")}
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
              >
                <Input
                  placeholder={t("productCategory.add.placeholder.EnterName")}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="name arabic" name="nameAr">
                <Input
                  placeholder={t("productCategory.add.placeholder.EnterName")}
                />
              </Form.Item>
            </Col>
          </Row>


          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("description ar")}
                name="descriptionAr"
                rules={[
                  {
                    required: true,
                    message: t("descriptionAr") + " is required.",
                  },
                ]}
              >
                <Input.TextArea placeholder={t("descriptionAr")} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("descriptionEn")}
                name="descriptionEn"
                rules={[
                  {
                    required: true,
                    message: t("descriptionEn") + " is required.",
                  },
                ]}
              >
                <Input.TextArea placeholder={t("descriptionEn")} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
  label={t("image")}
  name="image"
  valuePropName="fileList"
  getValueFromEvent={(e) => e?.fileList}
  rules={[
    {
      required: true,
      message: t("image") + " is required.",
    },
  ]}
>
  <Upload
    listType="picture"
    beforeUpload={() => false}
    maxCount={1}
  >
    <Button icon={<UploadOutlined />}>
      {t("image")}
    </Button>
  </Upload>
</Form.Item>


          <Form.Item label={t("globals.status.checkActive")} name="isActive">
            <Select placeholder="Select status">
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
            loading={loading}
          >
            {t("productCategory.edit.title")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
