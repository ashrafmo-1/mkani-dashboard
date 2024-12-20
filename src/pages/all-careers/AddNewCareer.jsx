import React, { useState } from "react";
import { checkPermission } from "../../helpers/checkPermission";
import { Button, Form, message, Modal } from "antd";
import { useAddNewCareer } from "./hooks/useAddNewCareer";
import { CareerTitle } from "./components/CareerTitle";
import { CareerDescription } from "./components/CareerDescription";
import { CareerContent } from "./components/CareerContent";
import { CareerMetaDataEn } from "./components/CareerMetaDataEn";
import { CareermetaDataAr } from "./components/CareermetaDataAr";
import { CareerExtraDetailsEn } from "./components/CareerExtraDetailsEn";
import { CareerExtraDetailsAr } from "./components/CareerExtraDetailsAr";
import { Slug } from "./components/Slug";
import { CareerIsActive } from "./components/CareerIsActive";

const AddNewCareer = () => {
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
      {hasCreateUserPermission && (<Button onClick={showModal}>add new faq</Button>)}
      <Modal title="Add New career" footer={null} visible={isModalVisible} onCancel={handleCancel} width={850}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <CareerTitle />
          <CareerDescription />
          <CareerContent />
          <CareerMetaDataEn />
          <CareermetaDataAr />
          <CareerExtraDetailsEn />
          <CareerExtraDetailsAr />
          <Slug />
          <CareerIsActive />
          <Button type="primary" htmlType="submit" className="w-full" loading={isPending}>
            {"Add New career"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewCareer;
