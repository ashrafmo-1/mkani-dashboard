import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {Button, Col, Form, Input, Space} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

export const    MetaDataEn = ({value = [], onChange}) => {
    const {t} = useTranslation();

    return (
        <Col span={12}>
            <Form.Item
                label={t("Meta data Value English")}
                required
            >
                <Form.List
                    name="metaDataEn"
                    initialValue={value} // Set initial value from parent form
                >
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, fieldKey, ...restField}) => (
                                <Space key={key} style={{display: "flex", marginBottom: 8}} align="baseline">
                                    {/* Input for the metadata title */}
                                    <Form.Item
                                        {...restField}
                                        name={[name, "title"]}
                                        fieldKey={[fieldKey, "title"]}
                                        rules={[
                                            {
                                                required: true,
                                                message: t("Title is required."),
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder={t("Enter title in English")}
                                            onChange={(e) =>
                                                onChange?.(
                                                    fields.map((field, index) =>
                                                        index === name ? {...field, title: e.target.value} : field
                                                    )
                                                )
                                            }
                                        />
                                    </Form.Item>
                                    {/* Input for the metadata value */}
                                    <Form.Item
                                        {...restField}
                                        name={[name, "value"]}
                                        fieldKey={[fieldKey, "value"]}
                                        rules={[
                                            {
                                                required: true,
                                                message: t("Value is required."),
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder={t("Enter value in English")}
                                            onChange={(e) =>
                                                onChange?.(
                                                    fields.map((field, index) =>
                                                        index === name ? {...field, value: e.target.value} : field
                                                    )
                                                )
                                            }
                                        />
                                    </Form.Item>
                                    {/* Remove Button */}
                                    {fields.length > 1 && (
                                        <MinusCircleOutlined onClick={() => remove(name)}/>
                                    )}
                                </Space>
                            ))}
                            {/* Add Button */}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined/>}
                                >
                                    {t("Add new English meta data")}
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>
        </Col>
    );
};
