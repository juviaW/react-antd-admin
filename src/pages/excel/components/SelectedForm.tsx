import React from 'react';
import { Row, Col, Form, Input, Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { RADIODATA, SELECTDATA, FILENAME } from "../config";

const inputItemLayout = {
    wrapperCol: { span: 22 },
};

interface SelectedFormProps {
    loading: boolean;
    handleExport: Function;
}

export default (props: SelectedFormProps) => {
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
                        name="filename"
                    >
                        <Input placeholder={'请输入文件名（默认' + FILENAME + '）'}/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item>
                        <Button type="primary" icon={<ExportOutlined />} loading={loading} onClick={clickExport}>
                            导出已选择项
                    </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </div>
}
