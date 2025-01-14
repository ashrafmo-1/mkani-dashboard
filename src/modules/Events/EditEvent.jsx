import { EditFilled, UploadOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useEditEventHook } from "./Hooks/useEditEventHook";
import { useGetSingleEventHook } from "./Hooks/useGetSingleEventHook";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Title, MetaDataEn, MetaDataAr, Description, Slug } from "../../common";
import { toast } from "react-toastify";

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
      toast.error("Failed to edit FAQ.");
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
        isPublished: data.isPublished !== undefined ? String(data.isPublished) : "",
      });
    }
  }, [data, form, isModalVisible]);

  return (
    <div>
      <Button className="text-green-900" onClick={showModal}>
        <EditFilled className="text-green-900" />
      </Button>

      <Modal
        title="edit Event"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <Form
          layout="vertical"
          className="mt-6"
          onFinish={handleSubmit}
          form={form}
        >
          <Title />
          <Slug />
          <Description />
          <Row gutter={[16, 16]}>
            <MetaDataAr />
            <MetaDataEn />
          </Row>

          <Form.Item label="Thumbnail" name="thumbnail">
            <Upload name="thumbnail" listType="picture">
              <Button icon={<UploadOutlined />}>{"Click to Upload"}</Button>
            </Upload>
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Date is required." }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Time is required." }]}
              >
                <TimePicker format="HH:mm:ss" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Location is required." }]}
          >
            <Input type="text" placeholder="enter location" />
          </Form.Item>

          <Form.Item label="is published" name="isPublished">
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
            loading={isPending}
          >
            {t("globals.edit")}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
