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

    // 执行相应操作
    const executeRequest = () => {
        console.log(`执行 ${method} 请求`);
        // 在这里你可以执行与选择的方法相关的操作
    };

    return (
        <div>
            {/* 下拉框，当用户选择时触发 handleMethodChange 函数 */}
            <select className="border border-gray-300 p-2 rounded-md mr-4"  value={method} onChange={handleMethodChange}>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                {/* 添加其他 HTTP 请求方法的选项 */}
            </select>
            {/* 按钮，点击时执行 executeRequest 函数 */}
            {/* <button onClick={executeRequest}>执行请求</button> */}
        </div>
    );
}

export default HttpRequestDropdown;
