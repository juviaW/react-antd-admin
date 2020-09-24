import React, { useState } from 'react';
import { Table, Tag } from "antd";
import { ContentHeader, ContentMain } from "./components/Layout";
import ExportForm from "./components/ExportForm";
import { dataSource, FILENAME } from "./config";
import { parseTime } from "utils/index";
import { export_json_to_excel } from 'vendor/Export2Excel';
import { ResultsProps } from "types/excel";

interface ValueListProps {
    filename: string,
    autoWidth: boolean,
    bookType: string,
}

export default () => {

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


    const formatJson = (filterVal: string[], jsonData: ResultsProps[]) => {
        return jsonData.map((v: ResultsProps) => filterVal.map((j: string) => {
            if (j === 'timestamp') {
                return parseTime(v[j])
            } else {
                return v[j]
            }
        }))
    }

    /**
     * 导出回调
     * @param values 获取的form值
     */
    const handleExport = (values: ValueListProps) => {
        setExportLoading(true);
        const tHeader = columns.map(item => item.title);
        const filterVal = columns.map(item => item.dataIndex);
        const data = formatJson(filterVal, dataSource);
        const fileName = values.filename ? values.filename : FILENAME;
        export_json_to_excel({
            header: tHeader,
            data,
            filename: fileName,
            autoWidth: values.autoWidth,
            bookType: values.bookType,
        })
        setExportLoading(false);
    }

    return <div>
        <ContentHeader>
            <ExportForm
                loading={exportLoading}
                handleExport={handleExport}
            />
        </ContentHeader>
        <ContentMain>
            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey='guid'
                bordered
                pagination={false}
            />
        </ContentMain>
    </div>
};
