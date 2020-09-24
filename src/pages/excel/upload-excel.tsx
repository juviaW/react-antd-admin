import React, { useState } from 'react';
import { Table } from "antd";
import { v1 as uuidv1 } from 'uuid';
import { ResultsProps, UploadDataProps, ColumnsProps } from "types/excel";
import UploadBox from "./components/UploadBox";
import { ContentHeader, ContentMain } from "./components/Layout";

export default () => {
    const [columns, setColumns] = useState<ColumnsProps[]>([]);
    const [dataSource, setDataSource] = useState<ResultsProps[]>([]);
    const getUploadData = (data: UploadDataProps) => {
        const tableColumns = data.header.map((item: string) => (
            {
                title: item,
                dataIndex: item,
                key: item,
            }
        ));
        const tableDataSource = data.results.map(item => ({
            guid: uuidv1(),
            ...item
        }))
        setColumns(tableColumns);
        setDataSource(tableDataSource);
    }
    return <div>
        <ContentHeader>
            <UploadBox getUploadData={getUploadData} />
        </ContentHeader>
        <ContentMain>
            {columns.length ?
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey='guid'
                    bordered
                    pagination={false}
                />
                : null
            }
        </ContentMain>
    </div>;
}
