import Mock from 'mockjs';
import { message } from "antd";
let List = [];
const count = 6;
for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        guid: '@guid',
        id: '@increment',
        title: '@title(5, 10)',
        author: '@first',
        readings: '@integer(10, 100)',
        date: '@date(yyyy-mm-dd)',
    }))
}

export const dataSource = List;

export const RADIODATA = [
    {
        key: '1',
        text: 'True',
        value: true,
    },
    {
        key: '2',
        text: 'False',
        value: false,
    },
]
export const SELECTDATA = [
    {
        key: '1',
        text: 'xlsx'
    },
    {
        key: '2',
        text: 'csv'
    },
    {
        key: '3',
        text: 'txt'
    },
]

export const FILENAME = 'excel-list';

const IMPORTFILE = ['xlsx', 'xls'];
/**
 * 文件名称校验
 * @param file 文件名称
 */
export const checkImportFile = (file: string) => IMPORTFILE.indexOf(file.substr(file.lastIndexOf('.') + 1)) > -1;

export const beforeUpload = (file: File) => {
    const isXlsx = checkImportFile(file.name);
    if (!isXlsx) {
        message.error('只能上传xlsx、xls格式的文件');
        return false;
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
        message.error('上传文件必须小于1M');
        return false;
    }
    return true;
}