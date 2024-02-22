'use client'

import React, { useEffect, useState } from 'react';

function ParamTable({url}: {url: string}) {
    const [params, setParams] = useState([{ key: '', value: '', include: true}]);

    // 由 url 得到数组
    function parseUrl(url: string) {
        const search = new URL(url).search;
        const params = new URLSearchParams(search);
        const result = [];
        for (const [key, value] of params) {
            result.push({ key, value, include: true });
        }
        return result;
    }

    // 初始化时解析 url
    useEffect(() => {
        if (url) {
            setParams(parseUrl(url));
        }
    }, [url]);

    // 处理key变化事件
    const handleKeyChange = (index: number, value: string) => {
        const newParams = [...params];
        newParams[index].key = value;
        // 如果是最后一个参数，并且值不为空，则添加一个新的空参数
        if (index === params.length - 1 && value !== '') {
            newParams.push({ key: '', value: '', include: false});
        }
        setParams(newParams);
    };

    // 处理value变化事件
    const handleValueChange = (index: number, value: string) => {
        const newParams = [...params];
        newParams[index].value = value;
        setParams(newParams);
    };

    // 处理include变化事件
    const handleIncludeChange = (index:number) => {
        const newParams = [...params];
        newParams[index].include = !newParams[index].include;
        setParams(newParams);
    };

    // 由数组拼接参数得到查询字符串
    function buildQueryString(params: { key: string, value: string, include: boolean }[]) {
        const queryString = params
            .filter(param => param.include) // 仅包含 include 为 true 的参数
            .filter(param => param.key !== '' && param.value !== '') // 仅包含 key 和 value 都不为空的参数
            .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`) // 对键值进行编码
            .join('&'); // 使用 & 符号连接参数

        return '?'+queryString;
    }

    // 由查询字符串得到数组
    // function parseQueryString(queryString: string) {
    //     const params = new URLSearchParams(queryString);
    //     const result = [];
    //     for (const [key, value] of params) {
    //         result.push({ key, value, include: true });
    //     }
    //     return result;
    // }

    return (
        <>
        <table className="w-full table-auto">
            <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2">Key</th>
                    <th className="px-4 py-2">Value</th>
                </tr>
            </thead>
            <tbody>
                {params.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                        <td className="px-4 py-2">
                            <input
                                type="checkbox"
                                checked={item.include}
                                onChange={() => handleIncludeChange(index)}
                            />
                        </td>
                        <td className="px-4 py-2">
                            <input
                                type="text"
                                className="border border-gray-300 rounded px-2 py-1"
                                value={item.key}
                                onChange={(e) => handleKeyChange(index, e.target.value)}
                            />
                        </td>
                        <td className="px-4 py-2">
                            <input
                                type="text"
                                className="border border-gray-300 rounded px-2 py-1"
                                value={item.value}
                                onChange={(e) => handleValueChange(index, e.target.value)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
            <div>
                {params.map((item, index) => (
                    // 仅当 include 为 true 时渲染
                    item.include && (
                        <div key={index}>{item.key}: {item.value}</div>
                    )
                ))}
            </div>
            <div>{buildQueryString(params)}</div>

        </>
    );
}

export default ParamTable;
