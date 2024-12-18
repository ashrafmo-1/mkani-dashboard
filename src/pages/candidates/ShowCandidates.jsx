import { EyeFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import React from "react";

export const ShowCandidates = ({ candidateId }) => {
  return (
    <div>
      <Button>
        <EyeFilled />
      </Button>
      {/* visible={isModalVisible} onCancel={handleCancel} */}
      <Modal title="Add New product" footer={null}>
        <Form>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="name english" name="nameEn" rules={[{ required: true, message: "name english is required." }]}>
                <Input placeholder="Enter name english" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="name arabic" name="nameAr" rules={[{ required: true, message: "name arabic is required."}]}>
                <Input placeholder="Enter name arabic" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
