import React, { useState } from 'react';
import { Table, Tag, Button} from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { ContentHeader, ContentMain } from "./components/Layout";
import { dataSource, FILENAME } from "./config";
import { parseTime } from "utils/index";
import { export_json_to_excel } from 'vendor/Export2Excel';

export default () => {

    const [exportLoading, setExportLoading] = useState(false);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Main Information',
            dataIndex: 'mainInformation',
            key: 'mainInformation',
            children: [
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
            ]
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];


    const formatJson = (filterVal: string[], jsonData: any) => {
        return jsonData.map((v: any) => filterVal.map((j: string) => {
            if (j === 'timestamp') {
                return parseTime(v[j])
            } else {
                return v[j]
            }
        }))
    }

    /**
     * 导出
     */
    const handleExport = () => {
        setExportLoading(true);
        const multiHeader = [[columns[0].title, columns[1].title, '', '', columns[2].title]];
        const childHeader = columns[1].children ? columns[1].children.map(item => item.title) : [];
        const header = ['',...childHeader,''];
        const childFilterVal = columns[1].children ? columns[1].children.map(item => item.dataIndex) : [];
        const filterVal = [columns[0].dataIndex, ...childFilterVal, columns[2].dataIndex];
        const data = formatJson(filterVal, dataSource);
        const merges = ['A1:A2', 'B1:D1', 'E1:E2'];
        const fileName = FILENAME;
        export_json_to_excel({
            multiHeader,
            header,
            merges,
            data,
            filename: fileName,
        })
        setExportLoading(false);
    }

    return <div>
        <ContentHeader>
            <Button type="primary" icon={<ExportOutlined />} loading={exportLoading} onClick={handleExport}>
                导出 Excel
            </Button>
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
