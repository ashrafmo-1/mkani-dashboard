import { EditOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, message, Modal, Row, Select, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { useEditBlogHook } from './hooks/useEditBlogHook';
import { useBlog_categoriesHook } from '../blog_categories/hooks/useBlog_categoriesHook';

export const EditBlog = ({ blogId, initialValues }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { editBlog } = useEditBlogHook();
  const { blog_category } = useBlog_categoriesHook();
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm();

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
    try {
      await editBlog(blogId, values);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to edit user:", error);
    }
  };

  return (
    <div>
      <Button onClick={showModal}>
        <EditOutlined className='text-green-700' />
      </Button>

      <Modal title="Add New Blog" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Title Arabic" name="titleAr" rules={[{ required: true, message: "Title is required." }]}>
                <Input placeholder="Enter title Arabic"  />
                {/* value={values.titleAr} */}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="title English" name="titleEn" rules={[{ required: true, message: "title is required." }]}>
                <Input placeholder="Enter title English" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Slug Arabic" name="slugAr" rules={[{ required: true, message: "Slug Arabic is required." }]}>
                <Input placeholder="Enter Slug Arabic" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Slug English" name="slugEn" rules={[{ required: true, message: "Slug english is required." }]}>
                <Input placeholder="Enter Slug English" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="content Arabic" name="contentAr" rules={[{ required: true, message: "content Arabic is required." }]}>
                <Input placeholder="Enter content Arabic" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="content English" name="contentEn" rules={[{ required: true, message: "content english is required." }]}>
                <Input placeholder="Enter content English" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="meta data Arabic" name="metaDataAr" rules={[{ required: true, message: "meta Data Arabic is required." }]}>
                <Input placeholder="Enter meta data Arabic" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="meta data English" name="metaDataEn" rules={[{ required: true, message: "meta data english is required." }]}>
                <Input placeholder="Enter meta data English" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Thumbnail" name="thumbnail" rules={[{ required: true, message: "Thumbnail is required." }]}>
                <Upload listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="is published" name="isPublished" rules={[{ required: true, message: "is published is required." }]}>
            <Select placeholder="Select status">
              <Select.Option value="1">Published</Select.Option>
              <Select.Option value="0">Draft</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item label="Category" name="categoryId" rules={[{ required: true, message: "Category is required." }]}>
            <Select placeholder="Select category">
            {blog_category.map((category, index) => (
                <Select.Option value={category.blogCategoryId}  key={index}>{category.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full" loading={isPending}>
            Add New Blog
          </Button>
        </Form>
      </Modal>
    </div>
  )
}