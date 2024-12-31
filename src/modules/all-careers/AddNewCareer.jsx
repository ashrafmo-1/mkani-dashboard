import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { Button, Col, Form, message, Modal, Row } from "antd";
import { useAddNewCareer } from "./hooks/useAddNewCareer";
import { CareerContent } from "./components/CareerContent";
import { CareerMetaDataEn } from "./components/CareerMetaDataEn";
import { CareermetaDataAr } from "./components/CareermetaDataAr";
import { CareerExtraDetailsEn } from "./components/CareerExtraDetailsEn";
import { CareerExtraDetailsAr } from "./components/CareerExtraDetailsAr";
import { Slug } from "./components/Slug";
import { CareerIsActive } from "./components/CareerIsActive";
import { PlusSquareFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Description } from "../../common/modules/create-edit/Description";
import { Title } from "../../common/modules/create-edit/Title";

const AddNewCareer = () => {
  const { t } = useTranslation();
  const hasCreateUserPermission = checkPermission("create_customer");
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { addCareer } = useAddNewCareer();
  const showModal = () => setIsModalVisible(true);

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (formData) => {
    try {
      setIsPending(true);
      await addCareer(formData);
      message.success("Career added successfully.");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.status) {
        message.error("The selected status is invalid.");
      } else {
        message.error("Failed to send form. Please try again.", error);
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
          {t("globals.add")}
        </Button>
      )}
      <Modal
        title={t("globals.add")}
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
        width={900}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Title />
          <Description />
          <CareerContent />

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <CareerMetaDataEn />
            </Col>
            <Col span={12}>
              <CareermetaDataAr />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <CareerExtraDetailsEn />
            </Col>
            <Col span={12}>
              <CareerExtraDetailsAr />
            </Col>
          </Row>

          <Slug />
          <CareerIsActive />

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isPending}
          >
            {t("globals.add")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewCareer;
