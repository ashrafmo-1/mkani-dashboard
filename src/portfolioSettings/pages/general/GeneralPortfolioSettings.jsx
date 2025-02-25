import React, { useEffect, useState } from "react";
import { Form, Button, Upload, Input, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useGeneralSettingsPortfolioHook } from "../../hooks/useGeneralSettingsPortfolioHook";
import { useEditGeneralSettingsPortfolio } from "../../hooks/useEditGeneralSettingsPortfolio";
import { toast } from "react-toastify";

export const GeneralPortfolioSettings = () => {
  const { data } = useGeneralSettingsPortfolioHook("1");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { editGeneralSettingsPortfolio } = useEditGeneralSettingsPortfolio();

  const handleSubmit = () => {
    setLoading(true);
    form.validateFields().then((values) => {
        const { logo, favicon, ...restValues } = values;

        const formData = new FormData();
        formData.append("content", JSON.stringify(restValues));

        if (logo?.[0]?.originFileObj) {
          formData.append("logo", logo[0].originFileObj);
        } else {
          formData.append("logo", "");
        }

        if (favicon?.[0]?.originFileObj) {
          formData.append("favicon", favicon[0].originFileObj);
        } else {
          formData.append("favicon", "");
        }

        editGeneralSettingsPortfolio(
          { values: formData },
          {
            onSuccess: () => {
              setLoading(false);
              toast.success("Portfolio settings updated successfully!");
            },
            onError: (error) => {
              setLoading(false);
              const errorMessage = error.response?.data?.message;
              if (typeof errorMessage === "object") {
                Object.entries(errorMessage).forEach(([field, messages]) => {
                  messages.forEach((msg) => {
                    toast.error(msg);
                  });
                });
              }
            },
            onSettled: () => {
              setLoading(false);
            },
          }
        );
      })
      .catch((errorInfo) => {
        setLoading(false);
        console.log("Validate Failed:", errorInfo);
      });
  };

  const handleUploadChange = (info) => {
    console.log("Upload Status:", info.file.status);
  };

  useEffect(() => {
    if (data) {
      console.log();
      let newData;
      try {
        newData = data.data.content;
      } catch (e) {
        console.error("Invalid JSON data:", e);
        newData = {};
      }
      form.setFieldsValue({
        title: newData?.title,
        descriptionEn: newData.descriptionEn,
        descriptionAr: newData.descriptionAr,
        addressesEn: newData.addressesEn || [],
        addressesAr: newData.addressesAr || [],
        contact: newData.contact || [],
        emails: newData.emails || [],
        googleMapLink: newData.googleMapLink || [],
        socialMedia: {
          facebook: newData.socialMedia?.facebook || "",
          instagram: newData.socialMedia?.instagram || "",
          tikTok: newData.socialMedia?.tikTok || "",
        },
        logo: data?.data?.logo
          ? [
              {
                uid: "-1",
                name: "logo.png",
                status: "done",
                url: data?.data?.logo,
              },
            ]
          : [],
        favicon: data?.data?.favicon
          ? [
              {
                uid: "-2",
                name: "favicon.ico",
                status: "done",
                url: data?.data?.favicon,
              },
            ]
          : [],
      });
    }
  }, [data, form]);

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Portfolio Title"
          name="title"
          rules={[
            { required: true, message: "Please enter the portfolio title" },
          ]}
        >
          <Input placeholder="Enter portfolio title" />
        </Form.Item>

        {/* descriptions */}
        <Form.Item
          label="Portfolio arabic Description"
          name="descriptionAr"
          rules={[
            {
              required: true,
              message: "Please enter the portfolio arabic description",
            },
          ]}
        >
          <Input.TextArea placeholder="Enter portfolio arabic description" rows={4} />
        </Form.Item>

        <Form.Item
          label="Portfolio english Description"
          name="descriptionEn"
          rules={[
            {
              required: true,
              message: "Please enter the portfolio english description",
            },
          ]}
        >
          <Input.TextArea placeholder="Enter portfolio englishenglish description" rows={4} />
        </Form.Item>

        {/* addreess */}
        <Form.Item
          label="arabic Addresses"
          name="addressesAr"
          rules={[
            { required: true, message: "Please enter the portfolio arabic addresses" },
          ]}
        >
          <Select mode="tags" placeholder="Enter portfolio arabic addresses">
            {data?.data?.content?.addressAr?.map((addressAr, index) => (
              <Select.Option key={index} value={addressAr}>
                {addressAr}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* addreess */}
        <Form.Item
          label="english Address"
          name="addressesEn"
          rules={[
            { required: true, message: "Please enter the portfolio english addresses" },
          ]}
        >
          <Select mode="tags" placeholder="Enter portfolio english addresses">
            {data?.data?.content?.addressEn?.map((addressEn, index) => (
              <Select.Option key={index} value={addressEn}>
                {addressEn}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Contact numbers"
          name="contact"
          rules={[
            { required: true, message: "Please enter the portfolio contact" },
          ]}
        >
          <Select mode="tags" placeholder="Enter portfolio contact">
            {data?.data?.content?.contact?.map((contact, index) => (
              <Select.Option key={index} value={contact}>
                {contact}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="emails"
          name="emails"
          rules={[
            { required: true, message: "Please enter emails"},
          ]}
        >
          <Select mode="tags" placeholder="Enter emails">
            {data?.data?.content?.emails?.map((emails, index) => (
              <Select.Option key={index} value={emails}>
                {emails}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="google map link"
          name="googleMapLink"
          rules={[
            { required: true, message: "Please enter google map link" },
          ]}
        >
          <Input placeholder="Enter google map link" />
        </Form.Item>

        <Form.Item
          label="Facebook URL"
          name={["socialMedia", "facebook"]}
          rules={[{ required: true, message: "Please enter Facebook URL" }]}
        >
          <Input placeholder="Facebook URL" />
        </Form.Item>

        <Form.Item
          label="Instagram URL"
          name={["socialMedia", "instagram"]}
          rules={[{ required: true, message: "Please enter Instagram URL" }]}
        >
          <Input placeholder="Instagram URL" />
        </Form.Item>

        <Form.Item
          label="Tik Tok URL"
          name={["socialMedia", "tikTok"]}
          rules={[{ required: true, message: "Please enter tikTok URL" }]}
        >
          <Input placeholder="tikTok URL" />
        </Form.Item>

        <div className="flex gap-8">
          <Form.Item
            label={"logo"}
            name="logo"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[
              {
                required: true,
                message: "logo is required.",
              },
            ]}
          >
            <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>{"edit"}</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            className="w-[200px]"
            label="Upload Favicon"
            name="favicon"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              name="favicon"
              listType="picture"
              maxCount={1}
              accept=".ico"
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Edit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};