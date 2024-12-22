import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { useAddCustomerHook } from "./Hooks/useAddCustomerHook";
import { PlusSquareFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const AddNewCustomer = () => {
  const { t } = useTranslation();
  const hasCreateUserPermission = checkPermission("create_customer");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { addNewCustomer } = useAddCustomerHook()
  const [isPending, setIsPending] = useState(false);
  
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
      await addNewCustomer(formData);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.status) {
        message.error("The selected status is invalid.");
      } else {
        console.error("Error adding user:", error);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      {hasCreateUserPermission && ( <Button onClick={showModal}> <PlusSquareFilled /> {t("customers.add")} </Button> )}
      <Modal title={t("customers.add")} visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label={t("customers.name")} name="name" rules={[{ required: true, message: "Name is required." }]}>
                <Input placeholder={t("customers.placeholder.EnterName")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t("customers.email")} name="email" rules={[{ required: true, message: "email is required." }]}>
                <Input placeholder={t("customers.placeholder.EnterEmail")} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label={t("customers.phone")} name="phone" rules={[{ required: true, message: "Phone is required." }]}>
            <Input placeholder={t("customers.placeholder.EnterPhone")} />
          </Form.Item>
          <Form.Item label={t("customers.address")} name="address" rules={[{ required: true, message: "Address is required." }]}>
            <Input placeholder={t("customers.placeholder.EnterAddress")} />
          </Form.Item>
          <Form.Item label={t("customers.description")} name="description"
            rules={[ 
              { required: true, message: "description is required." },
              { type: "description", message: "Please enter description" },
            ]}
          >
            <Input placeholder={t("customers.placeholder.EnterDescriptoin")} aria-label="description" />
          </Form.Item>

          {/* Submit Button */}
          <Button type="primary" htmlType="submit" className="w-full" loading={isPending}>
            {t("customers.add")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};