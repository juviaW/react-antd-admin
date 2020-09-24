import React, { useState } from 'react';
import { Table, Tag, message } from "antd";
import { ContentHeader, ContentMain } from "./components/Layout";
import SelectedForm from "./components/SelectedForm";
import { dataSource, FILENAME } from "./config";
import { export_json_to_excel } from 'vendor/Export2Excel';

interface ValueListProps {
    filename: string,
}

export default () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [exportLoading, setExportLoading] = useState(false);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            render: (text: string) => (
                <Tag color='blue'>
                    {text}
                </Tag>
            )
        },
        {
            title: 'Readings',
            dataIndex: 'readings',
            key: 'readings',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];


    const formatJson = (filterVal: string[], jsonData: any) => {
        return jsonData.map((v:any) => filterVal.map(j => v[j]))
    }

    /**
     * 导出回调
     * @param values 获取的form值
     */
    const handleExport = (values: ValueListProps) => {
        if (selectedRows.length) {
            setExportLoading(true);
            const tHeader = columns.map(item => item.title);
            const filterVal = columns.map(item => item.dataIndex);
            const data = formatJson(filterVal, selectedRows);
            const fileName = values.filename ? values.filename : FILENAME;
            export_json_to_excel({
                header: tHeader,
                data,
                filename: fileName,
            })
            setSelectedRowKeys([]);
            setSelectedRows([]);
            setExportLoading(false);
        } else {
            message.warning('请先进行勾选')
        }
    }

    const onSelectChange = (keys: any, rows: any) => {
        setSelectedRowKeys(keys)
        setSelectedRows(rows)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return <div>
        <ContentHeader>
            <SelectedForm
                loading={exportLoading}
                handleExport={handleExport}
            />
        </ContentHeader>
        <ContentMain>
            <Table
                columns={columns}
                dataSource={dataSource}
                rowSelection={rowSelection}
                rowKey='guid'
                bordered
                pagination={false}
            />
        </ContentMain>
    </div>
};
