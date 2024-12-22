import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select, Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { CareerTitle } from "./components/CareerTitle";
import { CareerDescription } from "./components/CareerDescription";
import { CareerContent } from "./components/CareerContent";
import { CareerMetaDataEn } from "./components/CareerMetaDataEn";
import { CareermetaDataAr } from "./components/CareermetaDataAr";
import { CareerExtraDetailsEn } from "./components/CareerExtraDetailsEn";
import { CareerExtraDetailsAr } from "./components/CareerExtraDetailsAr";
import { Slug } from "./components/Slug";
import { CareerIsActive } from "./components/CareerIsActive";
import { useEditCareer } from "./hooks/useEditCareer";
import { useGetSingleCareerHook } from "./hooks/useGetSingleCareerHook";

const EditAllCareers = ({ careerId }) => {
  const { editCareer } = useEditCareer();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const { data } = useGetSingleCareerHook(careerId);

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
      await editCareer(careerId, values);
      message.success("FAQ edited successfully.");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to edit FAQ.", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        titleAr: data.titleAr,
        titleEn: data.titleEn,
        descriptionAr: data.descriptionAr,
        descriptionEn: data.descriptionEn,
        contentAr: data.contentAr,
        contentEn: data.contentEn,
        metaDataAr: data.metaDataAr,
        metaDataEn: data.metaDataEn,
        extraDetailsAr: data.extraDetailsAr,
        extraDetailsEn: data.extraDetailsEn,
        slugAr: data.slugAr,
        slugEn: data.slugEn,
        isActive: data.isActive,
      });
    }
  }, [data, form, isModalVisible]);

  return (
    <div>
      <Button className="edit" onClick={showModal}>
        <EditOutlined />
      </Button>

      <Modal
        title="edit career"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
        width={850}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <CareerTitle />
          <CareerDescription />
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
            {"Add New career"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default EditAllCareers;
