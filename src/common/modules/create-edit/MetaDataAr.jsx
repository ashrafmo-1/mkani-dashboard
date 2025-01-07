import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {Button, Col, Form, Input, Space} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

export const MetaDataAr = () => {
    const { t } = useTranslation();
    return (
        <Col span={12}>
            <Form.Item className="form_item_Metadata_career" label="Meta data Value arabic" name={["metaDataAr", 0]}
                       rules={[
                           {
                               required: true,
                               message:
                                   t("value") + " is required.",
                           },
                       ]}>
                <Form.List name="metaDataAr">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, fieldKey, ...restField}) => (
                                <Space key={key} style={{display: "flex", marginBottom: 8}} align="baseline">
                                    <Form.Item {...restField} name={[name, "title"]} fieldKey={[fieldKey, "title"]}
                                               rules={[{required: true, message: "Title is required"}]}
                                    >
                                        <Input placeholder="Enter title English"/>
                                    </Form.Item>
                                    <Form.Item {...restField} name={[name, "value"]} fieldKey={[fieldKey, "value"]}
                                               rules={[{required: true, message: "Value is required"}]}
                                    >
                                        <Input placeholder="Enter value English"/>
                                    </Form.Item>
                                    {fields.length > 1 && (
                                        <MinusCircleOutlined onClick={() => remove(name)}/>
                                    )}
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined/>}
                                >
                                    {"Add new arabic meta data"}
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>
        </Col>
    );
};