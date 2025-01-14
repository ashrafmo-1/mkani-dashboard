import {
  MinusCircleOutlined,
  PlusOutlined,
  PlusSquareFilled,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAddNewPageHook } from "../hooks/useAddNewPageHook";

export const AddNewPagePortfolio = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { addPortfolioPage } = useAddNewPageHook();

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
      await addPortfolioPage(formData);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error adding FAQ:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        className="border border-white"
      >
        <PlusSquareFilled />
        {t("add")}
      </Button>

      <Modal
        title={t("add new page")}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("title en")}
                name="titleEn"
                rules={[
                  { required: true, message: t("name english is required.") },
                ]}
              >
                <Input
                  placeholder={t("products.add.placeholder.EnterEnName")}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={t("title ar")}
                name="titleAr"
                rules={[
                  { required: true, message: t("name arabic is required.") },
                ]}
              >
                <Input
                  placeholder={t("products.add.placeholder.EnterArName")}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("slug en")}
                name="slugEn"
                rules={[{ required: true, message: t("slug is required.") }]}
              >
                <Input placeholder={t("products.add.placeholder.EnterSlug")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("slug ar")}
                name="slugAr"
                rules={[{ required: true, message: t("slug is required.") }]}
              >
                <Input placeholder={t("products.add.placeholder.EnterSlug")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                className="form_item_Metadata_career"
                label="Meta data Value english"
                name={["metaDataEn", 0]}
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Form.List name="metaDataEn">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "title"]}
                            fieldKey={[fieldKey, "title"]}
                            rules={[
                              { required: true, message: "Title is required" },
                            ]}
                          >
                            <Input placeholder="Enter title English" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "value"]}
                            fieldKey={[fieldKey, "value"]}
                            rules={[
                              { required: true, message: "Value is required" },
                            ]}
                          >
                            <Input placeholder="Enter value English" />
                          </Form.Item>
                          {fields.length > 1 && (
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          )}
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add new english meta data
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                className="form_item_Metadata_career"
                label="Meta data Value arabic"
                name={["metaDataAr", 0]}
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Form.List name="metaDataAr">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "title"]}
                            fieldKey={[fieldKey, "title"]}
                            rules={[
                              { required: true, message: "Title is required" },
                            ]}
                          >
                            <Input placeholder="Enter title English" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "value"]}
                            fieldKey={[fieldKey, "value"]}
                            rules={[
                              { required: true, message: "Value is required" },
                            ]}
                          >
                            <Input placeholder="Enter value English" />
                          </Form.Item>
                          {fields.length > 1 && (
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          )}
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          {"Add new arabic meta data"}
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="is active"
            name="isActive"
            rules={[{ required: true, message: "is active is required." }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="1">active</Select.Option>
              <Select.Option value="0">in active</Select.Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            {t("add")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
