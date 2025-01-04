import React from "react";
import { Form, Input, Button, Typography } from "antd";
import useAuthHook from "./hooks/useAuthHook";
import { LoginOutlined } from "@ant-design/icons";

export const LoginPage = () => {
  const { loading, formik } = useAuthHook();
  const { Title } = Typography;

  const initialValues = {
    username: formik.values.username || "",
    password: formik.values.password || "",
  };

  return (
    <section className="bg-pharma animate-gradient flex items-center justify-center w-full h-[100vh]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-md border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Title level={3} className="text-gray-900">
              Welcome back to MBO pharma!
            </Title>
            <Form
              className="space-y-4 md:space-y-6"
              onFinish={formik.handleSubmit}
              layout="vertical"
              initialValues={initialValues}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  placeholder="name@company.com"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  allowClear
                />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  allowClear
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  loading={loading}
                >
                  <div className={`swiper ${loading ? "loading" : ""}`}>
                    {loading ? "Logging in..." : "Login"}
                  </div>
                  <LoginOutlined />
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};