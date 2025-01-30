import { EditFilled, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  TimePicker,
  Upload,
} from "antd";
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
  const [fileList, setFileList] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    setIsPending(true);
    form.validateFields().then((values) => {
      const formData = new FormData();
      if (values.thumbnail && values.thumbnail[0]?.originFileObj) {
        formData.append("thumbnail", values.thumbnail[0].originFileObj);
      } else {
        formData.append("thumbnail", null);
      }
      formData.append("titleEn", values.titleEn || "");
      formData.append("titleAr", values.titleAr || "");
      formData.append("slugAr", values.slugAr || "");
      formData.append("slugEn", values.slugEn || "");
      formData.append("location", values.location  || "");
      formData.append("descriptionAr", values.descriptionAr || "");
      formData.append("descriptionEn", values.descriptionEn || "");
      formData.append("isPublished", values.isPublished ? "1" : "0");
      formData.append("time", moment(values.time, "HH:mm"));
      formData.append("date", moment(values.date).format("YYYY-MM-DD"));

      formData.append("metaDataEn[title]", values.metaDataEn?.title || "");
      formData.append("metaDataEn[description]", values.metaDataEn?.description || "");
      
      // Handle keywords for metaDataEn
      if (Array.isArray(values.metaDataEn?.keywords) && values.metaDataEn.keywords.length > 0) {
        values.metaDataEn.keywords.forEach((keyword, index) => {
          formData.append(`metaDataEn[keywords][${index}]`, keyword);
        });
      }

      formData.append("metaDataAr[title]", values.metaDataAr?.title || "");
      formData.append("metaDataAr[description]", values.metaDataAr?.description || "");
      
      // Handle keywords for metaDataAr
      if (Array.isArray(values.metaDataAr?.keywords) && values.metaDataAr.keywords.length > 0) {
        values.metaDataAr.keywords.forEach((keyword, index) => {
          formData.append(`metaDataAr[keywords][${index}]`, keyword);
        });
      }

      editEvent({ eventId: eventId, formData },
        {
          onSuccess: () => {
            setIsPending(false);
          },
          onError: (error) => {
            setIsPending(false);
            const errorMessage = error.response?.data?.message;
            if (typeof errorMessage === "object") {
              Object.entries(errorMessage).forEach(([field, messages]) => {
                messages.forEach((msg) => {
                  toast.error(msg);
                });
              });
            } else {
              toast.error(errorMessage || "Failed to edit event.");
            }
          },
          onSettled: () => {
            setIsPending(false);
          },
        }
      );
    })
    .catch((errorInfo) => {
      setIsPending(false);
      console.log("Validate Failed:", errorInfo);
    });
  };

  useEffect(() => {
    if (isModalVisible && data) {
      console.log(data.thumbnail);

      form.setFieldsValue({
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        slugAr: data.slugAr,
        slugEn: data.slugEn,
        // date: data.date ? moment(data.date).startOf('day') : null,
        time: moment(data.time, "HH:mm"),
        contentAr: data.contentAr,
        contentEn: data.contentEn,
        metaDataAr: data.metaDataAr,
        metaDataEn: data.metaDataEn,
        location: data.location,
        isPublished:
          data.isPublished !== undefined ? String(data.isPublished) : "",
          thumbnail: data.thumbnail ? [{ url: data.thumbnail }] : [],
        });
        setFileList(data.thumbnail ? [{ url: data.thumbnail }] : []);
    }
  }, [data, form, isModalVisible]);

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    form.setFieldsValue({ thumbnail: fileList });
  };

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

          <Form.Item
          label={t("thumbnail")}
          name="thumbnail"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
          rules={[
            {
              required: true,
              message: t("requie") + " is required.",
            },
          ]}
        >
          <Upload listType="picture" beforeUpload={() => false} onChange={handleChange}>
            <Button icon={<UploadOutlined />}>
              {t("update")}
            </Button>
          </Upload>
        </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={t("events.labels.date")}
                name="date"
                rules={[
                  {
                    required: true,
                    message: t("events.validation.dateRequired"),
                  },
                ]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Time is required." }]}
              >
                <TimePicker format="HH:mm" style={{ width: "100%" }} />
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
