import { EditFilled, UploadOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, message, Modal, Row, Select, TimePicker, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useEditEventHook } from "./Hooks/useEditEventHook";
import { useGetSingleEventHook } from "./Hooks/useGetSingleEventHook";
import { Title } from "../../common/modules/create-edit/Title";
import { Slug } from "../../common/modules/create-edit/Slug";
import { Description } from "../../common/modules/create-edit/Description";
import { MetaDataAr } from "../../common/modules/create-edit/MetaDataAr";
import { MetaDataEn } from "../../common/modules/create-edit/MetaDataEn";
import { useTranslation } from "react-i18next";
import moment from "moment";

export const EditEvent = ({ eventId }) => {
  const { t } = useTranslation();
  const { editEvent } = useEditEventHook();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState(false);
  const { data } = useGetSingleEventHook(eventId);

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
      await editEvent(eventId, values);
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to edit FAQ.");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (isModalVisible && data) {
      form.setFieldsValue({
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        slugAr: data.slugAr,
        slugEn: data.slugEn,
        date: moment(data.date, "YYYY-MM-DD"),
        time: moment(data.time, "HH:mm:ss"),
        contentAr: data.contentAr,
        contentEn: data.contentEn,
        metaDataAr: data.metaDataAr,
        metaDataEn: data.metaDataEn,
        location: data.location,
        isPublished: data.isPublished,
      });
    }
  }, [data, form, isModalVisible]);

  return (
    <div>
      <Button className="text-green-900" onClick={showModal}>
        <EditFilled className="text-green-900" />
      </Button>

      <Modal title="edit Event" visible={isModalVisible} onCancel={handleCancel} footer={null} width={700}>
        <Form layout="vertical" className="mt-6" onFinish={handleSubmit} form={form}>
          <Title />
          <Slug />
          <Description />
          <Row gutter={[16, 16]}>
            <MetaDataAr />
            <MetaDataEn />
          </Row>

          <Form.Item label="Thumbnail" name="thumbnail" rules={[{ required: true, message: "Thumbnail is required." }]}>
            <Upload name="thumbnail" listType="picture">
              <Button icon={<UploadOutlined />}>{"Click to Upload"}</Button>
            </Upload>
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Date" name="date" rules={[{ required: true, message: "Date is required." }]}>
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Time" name="time" rules={[{ required: true, message: "Time is required." }]}>
                <TimePicker format="HH:mm:ss" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Location" name="location" rules={[{ required: true, message: "Location is required." }]}>
            <Input type="text" />
          </Form.Item>

          <Form.Item label="is published" name="isPublished" rules={[{ required: true, message: "is published is required." }]}>
            <Select placeholder="Select status">
              <Select.Option value="1">Published</Select.Option>
              <Select.Option value="0">Draft</Select.Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full" loading={isPending}>
            {t("globals.add")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};