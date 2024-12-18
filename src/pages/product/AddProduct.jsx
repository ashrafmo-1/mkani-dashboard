import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { Button, Col, Form, Input, message, Modal, Row, Select, Space, Upload } from "antd";
import { useAddProductHook } from "./hook/useAddProductHook";
import TextArea from "antd/es/input/TextArea";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";

const AddProduct = () => {
  const { addProduct } = useAddProductHook();
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

  const handleSubmit = async (formData) => {
    try {
      setIsPending(true);
      await addProduct(formData);
      message.success("FAQ added successfully.");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.status) {
        message.error("The selected status is invalid.");
      } else {
        message.error("Failed to send form. Please try again.");
        console.error("Error adding FAQ:", error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="">
      {hasCreateUserPermission && (
        <Button onClick={showModal}>add new product</Button>
      )}

      <Modal title="Add New product" footer={null} visible={isModalVisible} onCancel={handleCancel}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="name english"
                name="nameEn"
                rules={[
                  { required: true, message: "name english is required." },
                ]}
              >
                <Input placeholder="Enter name english" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="name arabic"
                name="nameAr"
                rules={[
                  { required: true, message: "name arabic is required." },
                ]}
              >
                <Input placeholder="Enter name arabic" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="description english"
                name="descriptionEn"
                rules={[
                  {
                    required: true,
                    message: "description english is required.",
                  },
                ]}
              >
                <TextArea placeholder="Enter description english" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="description arabic"
                name="descriptionAr"
                rules={[
                  {
                    required: true,
                    message: "description arabic is required.",
                  },
                ]}
              >
                <TextArea placeholder="Enter description arabic" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="content english"
                name="contentEn"
                rules={[
                  { required: true, message: "content english is required." },
                ]}
              >
                <TextArea placeholder="Enter content english" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="content arabic"
                name="contentAr"
                rules={[
                  { required: true, message: "content arabic is required." },
                ]}
              >
                <TextArea placeholder="Enter content arabic" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="slug english"
                name="slugEn"
                rules={[
                  { required: true, message: "slug english is required." },
                ]}
              >
                <TextArea placeholder="Enter slug english" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="slug arabic"
                name="slugAr"
                rules={[
                  { required: true, message: "slug arabic is required." },
                ]}
              >
                <TextArea placeholder="Enter slug arabic" />
              </Form.Item>
            </Col>
          </Row>

          <div>
            <Form.Item
              className="form_item_Metadata_career"
              label="Meta data Value arabic"
              name={["metaDataAr", 0]}
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input placeholder="Enter first metadata value" />
            </Form.Item>

            <Form.List name="metaDataAr">
              {(fields, { add, remove }) => (
                <>
                  {fields
                    .slice(1)
                    .map(({ key, name, fieldKey, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 5 }}
                        align="baseline"
                      >
                        <Form.Item
                          className="form_item_Metadata_career"
                          {...restField}
                          name={name}
                          fieldKey={fieldKey}
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input placeholder="Enter metadata value" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

          <div>
            <Form.Item
              className="form_item_Metadata_career"
              label="Meta data Value english"
              name={["metaDataEn", 0]}
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input placeholder="Enter first metadata value" />
            </Form.Item>

            <Form.List name="metaDataEn">
              {(fields, { add, remove }) => (
                <>
                  {fields
                    .slice(1)
                    .map(({ key, name, fieldKey, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 5 }}
                        align="baseline"
                      >
                        <Form.Item
                          className="form_item_Metadata_career"
                          {...restField}
                          name={name}
                          fieldKey={fieldKey}
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input placeholder="Enter metadata value" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

          <Form.Item
            label="is active"
            name="isActive"
            rules={[{ required: true, message: "is active is required." }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="1">done</Select.Option>
              <Select.Option value="0">no</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Upload Images"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              return e?.fileList?.map((file) => ({
                path: file.response?.url || file.name,
              }));
            }}
            rules={[
              { required: true, message: "Please upload at least one image." },
            ]}
          >
            <Upload
              name="file"
              action="/upload"
              listType="picture"
              multiple={true} 
              maxCount={5}
            >
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Upload>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            Add New Faq
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProduct;
