import React from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import XLSX from 'xlsx';
import { UploadChangeParam } from "antd/lib/upload/interface";
import { beforeUpload } from "../config";

const { Dragger } = Upload;

interface UploadBoxProps {
    getUploadData: Function;
}

export default (props: UploadBoxProps) => {
    const { getUploadData } = props;

    const onChange = (info: UploadChangeParam) => {
        const { status } = info.file;
        if (status) {
            if (info.file && info.file.originFileObj) {
                const fileData = info.file.originFileObj;
                readerData(fileData)
            }
        }
    }

    const getHeaderRow = (sheet: any) => {
        const headers = []
        const range = XLSX.utils.decode_range(sheet['!ref'])
        let C
        const R = range.s.r
        /* start in the first row */
        for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
            const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
            /* find the cell in the first row */
            let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
            if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
            headers.push(hdr)
        }
        return headers
    }

    const readerData = (rawFile: File | Blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                const data = e.target.result
                const workbook = XLSX.read(data, { type: 'array' })
                const firstSheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[firstSheetName]
                const header = getHeaderRow(worksheet)
                const results = XLSX.utils.sheet_to_json(worksheet)
                const uploadData = { header, results }
                getUploadData(uploadData)
                resolve()
            }
            reader.readAsArrayBuffer(rawFile)
        })
    }

    return <div>
        <Dragger beforeUpload={beforeUpload} onChange={onChange} showUploadList={false}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
    </div>
}
