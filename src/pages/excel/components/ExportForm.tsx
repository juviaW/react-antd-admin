import React from 'react';
import { Row, Col, Form, Input, Radio, Select, Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { RADIODATA, SELECTDATA, FILENAME } from "../config";
import { KeyValueProps, RadioProps } from "types/excel";

const { Option } = Select;

const inputItemLayout = {
    wrapperCol: { span: 16 },
};
const selectItemLayout = {
    wrapperCol: { span: 8 },
};

interface ExportFormProps {
    loading: boolean;
    handleExport: Function;
}

export default (props: ExportFormProps) => {
    const { loading, handleExport } = props;
    const [form] = Form.useForm();

    const clickExport = () => {
        form.validateFields()
            .then(values => {
                handleExport(values);
            })
            .catch(errorInfo => {
                console.log(errorInfo)
            });
    }

    const initialValues = {
        autoWidth: RADIODATA[0].value,
        bookType: SELECTDATA[0].text,
    }
    return <div>
        <Form
            form={form}
            initialValues={initialValues}
        >
            <Row>
                <Col span={8}>
                    <Form.Item
                        {...inputItemLayout}
                        label="Filename"
                        name="filename"
                    >
                        <Input placeholder={'请输入文件名（默认' + FILENAME + '）'} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="Cell Auto-Width"
                        name="autoWidth"
                    >
                        <Radio.Group>
                            {RADIODATA.map((item: RadioProps) =>
                                <Radio key={item.key} value={item.value}>{item.text}</Radio>
                            )}
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        {...selectItemLayout}
                        label="Book Type"
                        name="bookType"
                    >
                        <Select>
                            {SELECTDATA.map((item: KeyValueProps) =>
                                <Option key={item.key} value={item.text}>{item.text}</Option>
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                        <Button type="primary" icon={<ExportOutlined />} loading={loading} onClick={clickExport}>
                            导出 Excel
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </div>
}
