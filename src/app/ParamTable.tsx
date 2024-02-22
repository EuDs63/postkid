'use client'

import { useAtom } from 'jotai';
import React, { useState,useEffect } from 'react';
import { urlAtom } from './atom';

function ParamTable() {
    const [params, setParams] = useState([{ key: '', value: '', include: true}]);
    const [url, setUrl] = useAtom(urlAtom);
    //const [params, setParams] = useAtom(urlArrayAtom);

    // 由 url 得到数组
    function parseUrl(url: string) {
        //先判断url是否符合URL
        if (!url) {
            return [{ key: '', value: '', include: true }];
        }

        // 获取查询字符串，但不使用 URL 对象，因为 URL 对象会自动解码参数
        const search = url.split('?')[1];
        if (!search) {
            return [{ key: '', value: '', include: true }];
        }
        const params = new URLSearchParams(search);

        // const search = new URL(url).search;
        // const params = new URLSearchParams(search);
        const result = [];
        // @ts-ignore
        for (const [key, value] of params) {
            result.push({ key, value, include: true });
        }
        result.push({ key: '', value: '', include: true });
        return result;
    }

    //初始化时解析 url
    useEffect(() => {
        if (url) {
            setParams(parseUrl(url));
        }
    }, [url]);

    // 由数组拼接参数得到url
    function buildUrl(params: { key: string, value: string, include: boolean }[]) {
        // 获取url中的路径,但不使用 URL 对象，因为 URL 对象会自动解码参数
        const path = url.split('?')[0];

        const includeParams = params.filter(param => param.include);

        if (includeParams.length === 0) {
            return path;
        }

        const queryString = includeParams
            .filter(param => param.key !== '' && param.value !== '') // 仅包含 key 和 value 都不为空的参数
            .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`) // 对键值进行编码
            .join('&'); // 使用 & 符号连接参数

        return `${path}?${queryString}`;

   }

    // 当 params 变化时更新 url
    useEffect(() => {
        setUrl(buildUrl(params));
    }, [params]);

    // 当 params 变化时更新 url
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setUrl(buildUrl(params));
    //     }, 1000); // 延迟 1 秒钟更新状态

    //     return () => clearTimeout(timeout); // 清除上一次的延迟更新
    // }, [params]);


    // 处理key变化事件
    const handleKeyChange = (index: number, value: string) => {
        const newParams = [...params];
        newParams[index].key = value;
        // 如果是最后一个参数，并且值不为空，则添加一个新的空参数
        if (index === params.length - 1) {
            newParams.push({ key: '', value: '', include: false});
        }
        setParams(newParams as typeof params);
    };

    // 处理value变化事件
    const handleValueChange = (index: number, value: string) => {
        const newParams = [...params];
        newParams[index].value = value;
        // 如果是最后一个参数，并且值不为空，则添加一个新的空参数
        // if (index === params.length - 1 && value !== '') {
        //     newParams.push({ key: '', value: '', include: false});
        // }
        setParams(newParams);
    };

    // 处理include变化事件
    const handleIncludeChange = (index:number) => {
        const newParams = [...params];
        newParams[index].include = !newParams[index].include;
        setParams(newParams);
    };

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
            {/* <div>
                {params.map((item, index) => (
                    // 仅当 include 为 true 时渲染
                    item.include && (
                        <div key={index}>{item.key}: {item.value}</div>
                    )
                ))}
            </div>
            <div>{buildQueryString(params)}</div> */}

        </>
    );
}

export default ParamTable;
