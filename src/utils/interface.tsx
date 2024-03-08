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

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    // 添加其他的 HTTP 方法...
}