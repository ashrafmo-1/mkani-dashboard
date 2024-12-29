import { Button, Divider, Form, Input } from "antd";
import React from "react";
import { useReplayMessageHook } from "../hooks/useReplayMessageHook";

export const ReplayForm = ({ contactUsId }) => {
  const [form] = Form.useForm();
  const { addNewReplay, isLoading } = useReplayMessageHook();

  const handleSubmit = async (values) => {
    const replayData = {
      contactUsId: contactUsId,
      message: values.message,
      isAdmin: 0,
      isRead: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    try {
      await addNewReplay(replayData);
      form.resetFields();
    } catch (error) {
      console.error("Failed to send reply:", error);
    }
  };

  return (
    <div>
      <Divider>Replay</Divider>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Your Message"
          name="message"
          rules={[{ required: true, message: "Please input your message!" }]}
        >
          <Input.TextArea rows={4} placeholder="Type your message here..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>{"Send Reply"}</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
