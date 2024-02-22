'use client';
import React, { useState } from 'react';

function HttpRequestDropdown() {
    // 定义状态变量 method，以及更新状态的函数 setMethod
    const [method, setMethod] = useState('GET');

    // 处理下拉框变化事件
    const handleMethodChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        // 获取用户选择的值，并更新状态
        setMethod(event.target.value);
    };

    return (
        <div>
            <select className="border border-gray-300 p-2 rounded-md mr-4" value={method} onChange={handleMethodChange}>
                <option className="text-emerald-400" value="GET">GET</option>
                <option className="text-red-400" value="POST">POST</option>
                {/* 添加其他 HTTP 请求方法的选项 */}
            </select>
        </div>
    );
}

export default HttpRequestDropdown;
