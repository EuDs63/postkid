'use client';
import React, { useState } from 'react';

function PostmanInterface() {
    const [method, setMethod] = useState('GET');
    const [url, setUrl] = useState('');
    const [response, setResponse] = useState('');

    const handleMethodChange = (event) => {
        setMethod(event.target.value);
    };

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };

    const handleSendRequest = () => {
        // 这里可以发送 HTTP 请求，并处理响应
        // 这里简单地打印请求信息和响应信息到控制台
        console.log('发送请求:', method, url);
        console.log('收到响应:', response);
    };

    return (
        <div>
            <h2>Postman Interface</h2>
            <div>
                <select value={method} onChange={handleMethodChange}>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    {/* 可以添加其他请求类型 */}
                </select>
                <input
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    placeholder="输入网址"
                    style={{ marginLeft: '10px', width: '300px' }}
                />
                <button onClick={handleSendRequest} style={{ marginLeft: '10px' }}>发送请求</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                {/* 这里显示响应内容 */}
                <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="响应内容"
                    style={{ width: '100%', height: '200px', padding: '10px' }}
                />
            </div>
        </div>
    );
}

export default PostmanInterface;
