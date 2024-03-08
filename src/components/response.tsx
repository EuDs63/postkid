'use client'
import { useEffect, useRef } from "react";
import '../../public/prism.css';
import Prism from "../../public/prism";
import { ResponseBean } from '@/utils/interface'

export default function Response ({ response }: { response: ResponseBean }){
    const codeElementRef = useRef<HTMLPreElement>(null);

    useEffect(() => {
        if (response.success && codeElementRef.current) {
            //console.log("the ref element is", codeElementRef.current);
            try {
                Prism.highlightElement(codeElementRef.current);
            } catch (error) {
                console.error('Prism.js error:', error);
            }
        }
    }, [response.data]);

    if (!response) {
        return null;
    }

    //  React Hook "useEffect" is called conditionally. 
    //  React Hooks must be called in the exact same order in every component render
    // useEffect(() => {
    //   if (data) {
    //     Prism.highlightAll();
    //   }
    // }, [data]);

    if (response.init) {
        return (
            <div className="border border-gray-500 p-4 rounded-md overflow-y-auto">
                <div className="text-lg font-bold mb-2">Enter the URL and click send to get a response</div>
            </div>
        );
    }
    else if (response.waiting) {
        return (
            <div className="border border-gray-500 p-4 rounded-md overflow-y-auto">
                <div className="text-lg font-bold mb-2">Waiting for response...</div>
            </div>
        );
    } else {
        return (
            <div>
                {response.success ? (
                    <div className="border border-green-500 p-4 rounded-md h-auto overflow-y-auto max-h-[calc(100vh-250px)] overflow-x-auto max-w-[650px]">
                        <div className="text-lg font-bold mb-2">SUCCESS</div>
                        <div>
                            <pre>
                                <code className="language-json language-html" ref={codeElementRef}>
                                    {response.data}
                                </code>
                            </pre>
                        </div>
                    </div>
                ) : (
                    <div className="border border-red-500 p-4 rounded-md overflow-y-auto">
                        <div className="text-lg font-bold mb-2">ERROR</div>
                        <p>{response.error}</p>
                    </div>
                )}
            </div>
        );
    }
};