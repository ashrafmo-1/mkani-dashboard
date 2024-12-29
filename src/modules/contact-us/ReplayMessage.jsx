import { useState } from "react";
import { MessageOutlined } from "@ant-design/icons";
import { Button, Modal, Descriptions, Typography, Divider } from "antd";
import React from "react";
import { useGetSingleMessageHook } from "./hooks/useGetSingleMessageHook";
// import { useReadMessage } from "./hooks/useReadMessage";
import { Status } from "../../components/Status";
import { ReplayForm } from "./components/ReplayForm";

const { Text } = Typography;

export const ReplayMessage = ({ contactUsId, contactUsMessageId }) => {
  const { data } = useGetSingleMessageHook(contactUsId);
  // const { markMessageAsRead } = useReadMessage();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOpen = async () => {
    try {
      //   await markMessageAsRead(contactUsMessageId);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  };

  return (
    <div>
      <Button className="replay-button" type="primary" onClick={handleOpen}>
        <MessageOutlined />
      </Button>

      <Modal title="Message Details" footer={null} visible={isModalVisible} onCancel={handleCancel}>
        {data ? (
          <div>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Subject"> {data.subject}
              </Descriptions.Item>
              <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{data.phone}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Status value={data.status} activeText={"active"} inactiveText={"in active"} />
              </Descriptions.Item>
            </Descriptions>

            <Divider>Messages</Divider>

            {data.messages.length > 0 ? (data.messages.map((msg) => (
                <div key={msg.contactUsMessageId} style={{ marginBottom: "10px" }}>
                  {/* <Text strong>{msg.isAdmin ? "Admin" : "User"}: </Text> */}
                  <div><Text strong> from: </Text> <Text>{data.name}</Text></div>
                  <div><Text strong> message: </Text> <Text>{msg.message}</Text></div>
                  <Text type="secondary" style={{ fontSize: "12px" }}>Sent At: {msg.sentAt}</Text>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No messages available.
              </p>
            )}
          </div>
        ) : (
          <Text type="secondary">Loading...</Text>
        )}

        <ReplayForm contactUsId={contactUsId} />
      </Modal>
    </div>
  );
};