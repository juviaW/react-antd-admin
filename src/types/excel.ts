export interface formatProps {
    [key: string]: number;
}

export interface KeyValueProps {
    key: string;
    text: string;
}

export interface RadioProps extends KeyValueProps {
    value: boolean;
}

export interface ResultsProps {
    [key: string]: string
}

export interface UploadDataProps {
    header: string[];
    results: ResultsProps[];
}

export interface ColumnsProps {
    title?: string;
    dataIndex?: string;
    key?: string;
}