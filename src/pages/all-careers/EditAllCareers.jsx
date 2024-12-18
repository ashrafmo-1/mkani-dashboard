import React, { useEffect, useState } from "react";
import { useEditFaqsHook } from "./hooks/useEditFaqsHook";
import { Button, Col, Form, Input, Row, Select, Modal, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

const EditAllCareers = ({ initialValues, careerId }) => {
  //   const { editFaq } = useEditFaqsHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (isModalVisible) {
      form.setFieldsValue(initialValues);
    }
  }, [isModalVisible, initialValues, form]);

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

  return (
    <div>
      <Button className="edit" onClick={showModal}>
        <EditOutlined />
      </Button>
    </div>
  );
};

export default EditAllCareers;
