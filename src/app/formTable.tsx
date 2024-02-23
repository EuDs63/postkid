'use client'

import { useAtom } from 'jotai';
import React, { useState, useEffect } from 'react';
import { formDataAtom } from './atom';

function FormTable() {
    const [params, setParams] = useAtom(formDataAtom);

    // 处理key变化事件
    const handleKeyChange = (index: number, value: string) => {
        const newParams = [...params];
        newParams[index].key = value;
        // 如果是最后一个参数，并且值不为空，则添加一个新的空参数
        if (index === params.length - 1) {
            newParams.push({ key: '', value: '', include: false });
        }
        setParams(newParams as typeof params);
    };

    // 处理value变化事件
    const handleValueChange = (index: number, value: string) => {
        const newParams = [...params];
        newParams[index].value = value;
        setParams(newParams);
    };

    // 处理include变化事件
    const handleIncludeChange = (index: number) => {
        const newParams = [...params];
        newParams[index].include = !newParams[index].include;
        setParams(newParams);
    };

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

        </>
    );
}

export default FormTable;
