'use client'

import { useState } from "react";
import { invoke } from "@tauri-apps/api";
import { useAtom, useAtomValue } from 'jotai'
import '../../public/prism.css';
import { bodyAtomFamily, bodyTypeAtomFamily, headerMapAtomFamily, methodAtomFamily, urlAtomFamily } from "../utils/atom";
import { ResponseBean } from '@/utils/interface'
import Response from "./response";
import UrlInput from "./urlInput";
import OptionPanel from "./optionPanel";
import MethodSelect from "./methodSelect";

export default function Work({ tabId = 0 }: { tabId?: number }) {
  // 定义请求方法
  const method = useAtomValue(methodAtomFamily(tabId)); 

  // 定义url
  const [url, setUrl] = useAtom(urlAtomFamily(tabId));

  const [response, setResponse] = useState<ResponseBean>({ init: true, waiting: false, success: false, data: '', error: '' })

  // 获取header_map
  const headerMap = useAtomValue(headerMapAtomFamily(tabId));

  // 获取body_type
  const bodyType = useAtomValue(bodyTypeAtomFamily(tabId));

  // 获取body
  const body = useAtomValue(bodyAtomFamily(tabId));

  interface RequestBean {
    method: string;
    url: string;
    header_map: Map<string, string>;
    body_type: string;
    body: any;
    [key: string]: any;
  }

  // 处理请求事件
  const handleRequest = () => {
    //console.log("send request, method:", method, "url:", url, "headerMap:", headerMap, "bodyType:", bodyType, "body:", body);
    // 清空response
    setResponse({ init: false, waiting: true, success: false, data: '', error: '' });

    // header_map 不行，报错invalid args `header_map` for command `send_request`: command send_request missing required key headerMap
    const request: RequestBean = {
      method: method,
      url: url,
      header_map: headerMap,
      body_type: bodyType,
      body: body
    }

    invoke<string>('send_request', { requestBean: request })
      .then(result => {
        setResponse({ init: false, waiting: false, success: true, data: result, error: '' });
      })
      .catch((error) => {
        setResponse({ init: false, waiting: false, success: false, data: '', error: error });
        console.error(error);
      });
  }

  return (
    <main className="flex flex-col items-center justify-between w-full">

      <div className="p-4 rounded-md shadow-md w-full h-full">
        <div className="flex flex-row items-center">
          <MethodSelect tabId={tabId}/>

          <UrlInput url={url} setUrl={setUrl} />

          <button className="bg-blue-500 text-white p-2 rounded-md" onClick={handleRequest}>Send</button>
        </div>

        <OptionPanel tabId={tabId} />

        <Response response={response} />
      </div>

    </main>
  );
}
