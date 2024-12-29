import { CloudUploadOutlined } from "@ant-design/icons";
import { Form, Input, Upload } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const HeroSection = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);

  const [pageData, setPageData] = useState({
    header: { logo: "https://via.placeholder.com/150" },
    hero: {
      title: t("hero.title"),
      subtitle: t("hero.subtitle"),
      background: "https://via.placeholder.com/800x400",
    },
  });

  const handleChange = ({ file: newFile }) => {
    setFile(newFile);
  };

  const handlePreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const imgWindow = window.open(src);
    imgWindow.document.write(`<img src="${src}" alt="Preview Image" />`);
  };

  return (
    <div className="px-8 py-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg">
      <h1 className="mb-6 text-4xl font-semibold capitalize text-white">
        Hero Section
      </h1>
      <Form className="flex gap-6 items-center">
        <Form.Item>
          <Upload listType="picture-card" onPreview={handlePreview} onChange={handleChange}
            fileList={file ? [file] : []}
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          >
            {!file ? (
              <div className="text-white hover:text-gray-300">
                <CloudUploadOutlined style={{ fontSize: "32px" }} />
                <div className="mt-2">Upload</div>
              </div>
            ) : null}
          </Upload>
        </Form.Item>
        <div className="flex-1">
          <Form.Item>
            <Input
              value={pageData.hero.title}
              placeholder={t("placeholders.EnterJobTitleEn")}
              className="text-2xl w-full px-4 py-2 rounded-md bg-gray-100 border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) =>
                setPageData((prev) => ({
                  ...prev,
                  hero: {
                    ...prev.hero,
                    title: e.target.value,
                  },
                }))
              }
            />
          </Form.Item>
          <Form.Item>
            <Input
              value={pageData.hero.subtitle}
              placeholder={t("placeholders.EnterDescriptionEn")}
              className="text-lg w-full px-4 py-2 rounded-md bg-gray-100 border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) =>
                setPageData((prev) => ({
                  ...prev,
                  hero: {
                    ...prev.hero,
                    subtitle: e.target.value,
                  },
                }))
              }
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
