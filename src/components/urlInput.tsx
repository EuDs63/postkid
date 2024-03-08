'use client'

import { useRef } from "react";

export default function UrlInput({url, setUrl}) {
    const urlAreaRef = useRef<HTMLTextAreaElement>(null);

    // 处理url变化事件
    const handleUrlChange = (event: { target: { value: string | ((prev: string) => string); }; }) => {
        // 获取用户输入的值，并更新状态
        setUrl(event.target.value);
    };

    const handleClick = () => {
        const urlArea = urlAreaRef.current;
        urlArea.style.height = `${urlArea.scrollHeight}px`
    }
    const handleBlur = () => {
        const urlArea = urlAreaRef.current;
        urlArea.style.height = 'auto';
    };
    
  return (
      <textarea
          className="p-2 rounded-md mr-2 resize-none flex-grow focus:outline focus:border-blue-500 h-auto"
          ref={urlAreaRef}
          value={url}
          rows={1}
          onChange={handleUrlChange}
          onFocus={handleClick}
          onBlur={handleBlur}
          placeholder="Enter url..."
      />
  );
}