'use client'

import Tabs from "./tab";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import {Provider,atom, useAtom } from 'jotai'
import { urlAtom } from "./atom";



export default function Home() {
  // 定义请求方法
  const [method, setMethod] = useState('GET');

  // 定义url
  const [url, setUrl] = useAtom(urlAtom);
  //const [url, setUrl] = useState('');

  // 定义response,为一个结构体，包含了success、data、error三个字段
  const [response,setResponse] = useState({success: false, data: '', error: ''})

  // 处理方法变化事件
  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // 获取用户选择的值，并更新状态
    setMethod(event.target.value);
  };

  // 处理url变化事件
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 获取用户输入的值，并更新状态
    setUrl(event.target.value);
  };

  useEffect(() => {
    if (url) {
      setUrl(url); // 更新 urlAtom 的值，触发 urlArrayAtom 重新计算
    }
  }, [url, setUrl]); // 确保 setUrl 在依赖中

  const handleRequest = () => {
    console.log("send request, method:", method, "url:", url);
    invoke<string>('send_request', { method, url })
      .then(result => setResponse(
        {success: true, data: result, error: ''}
      ))
      .catch( (error) => {
        setResponse(
          {success: false, data: '', error: error}
        );
        console.error(error);
      });
  }

  const Response = ({ response }: { response: any }) => {
    if (!response) {
      return null;
    }

    const { success, data, error } = response;

    if (success) {
      return (
        <div className="border border-green-500 p-4 rounded-md h-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <div className="text-lg font-bold mb-2">SUCCESS</div>
          {response.data}
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
      );
    } else if (error){
      return (
        <div className="border border-red-500 p-4 rounded-md overflow-y-auto">
          <div className="text-lg font-bold mb-2">ERROR</div>
          <p>{error}</p>
        </div>
      );
    }
    else {
      return (
        <div className="border border-gray-500 p-4 rounded-md overflow-y-auto">
          <div className="text-lg font-bold mb-2">Enter the URL and click send to get a response</div>
          <p>{error}</p>
        </div>
      );
    }
  };

  return (
    <main className="flex flex-col items-center justify-between h-screen w-screen">

        <div className="p-4 rounded-md shadow-md w-screen h-screen">
          <div className="flex flex-row items-center">
            <div>
              <select className="border border-gray-300 p-2 rounded-md mr-4" value={method} onChange={handleMethodChange}>
                <option className="text-emerald-400" value="GET">GET</option>
                <option className="text-red-400" value="POST">POST</option>
                {/* 添加其他 HTTP 请求方法的选项 */}
              </select>
            </div>

            <input type="text" className="border border-gray-300 p-2 rounded-md mr-4 w-3/4" placeholder="Enter URL" value={url} onChange={handleUrlChange}/>
            <button className="bg-blue-500 text-white p-2 rounded-md" onClick={handleRequest}>Send</button>
          </div>
          <Tabs url={url} />

          <div className="border border-gray-300 p-4">
          <Response response={response} />
          </div>
        </div>

    </main>
  );
}
