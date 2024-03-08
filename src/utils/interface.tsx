export interface Param {
    key: string;
    value: string;
    include: boolean;
}

export interface ResponseBean {
    init: boolean;
    waiting: boolean;
    success: boolean;
    data: string;
    error: string;
}