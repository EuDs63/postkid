'use client'
import React, { useCallback, useState } from 'react';
import ParamTable from './ParamTable';
import HeaderTable from './HeaderTable';
import BodyPanel from './bodyPanel';
import { Param } from '@/utils/interface';

function OptionItem({ tabName, selectedTab, onClick }: { tabName: string, selectedTab: string, onClick: (tabName: string) => void }) {
    return (
        <div
            className={`cursor-pointer px-4 py-2 border-b-2 ${selectedTab === tabName ? 'border-blue-500' : ''}`}
            onClick={() => onClick(tabName)}
        >
            {tabName}
        </div>
    );
}

function OptionPanel({ tabId }: { tabId: number }) {
    const [selectedOption, setSelectedOption] = useState('Params');

    const handleTabChange = (tabName: React.SetStateAction<string>) => {
        setSelectedOption(tabName);
    };

    // 解析url
    // 使用 useCallback 缓存函数，避免每次渲染都创建新的函数
    const parseUrl = useCallback((url: string) => {
        //先判断url是否符合URL
        if (!url) {
            return [{ key: '', value: '', include: false }];
        }

        // 获取查询字符串
        // 不使用 URL 对象，因为 URL 对象会自动解码参数
        // const search = new URL(url).search;
        const search = url.split('?')[1];

        if (!search) {
            return [{ key: '', value: '', include: false }];
        }
        const result = [];

        // 问题似乎出现在这里，我使用了URLSearchParams，其不支持提取不完整的参数
        const params = new URLSearchParams(search);

        // @ts-ignore
        for (const [k, v] of params) {
            result.push({ key:k||'', value:v||'', include: true });
        }

        // 尝试修改，bug依然存在
        // // 分割查询字符串
        // const pairs = search.split('&');

        // // 遍历查询参数对
        // for (const pair of pairs) {
        //     // 分割查询参数对
        //     const [key, value] = pair.split('=');

        //     // 将查询参数添加到结果数组中
        //     result.push({ key:key || '', value: value || '', include: true });
        // }

        // result.push({ key: '', value: '', include: false });
        return result;
    }, []);

    // 由数组拼接参数得到url
    const buildUrl = useCallback((url: string,params: Param[]) => {
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
    },[]);

    return (
        <div className="py-2 border-gray-500">
            <div className="flex mb-4">
                <OptionItem tabName="Params" selectedTab={selectedOption} onClick={handleTabChange} />
                {/* <TabItem tabName="Authorization" selectedTab={selectedTab} onClick={handleTabChange} /> */}
                <OptionItem tabName="Headers" selectedTab={selectedOption} onClick={handleTabChange} />
                <OptionItem tabName="Body" selectedTab={selectedOption} onClick={handleTabChange} />
            </div>
            <div className="border border-gray-500 rounded-md p-4 mb-2">
                {/* 根据选中的 tab 显示对应的内容 */}
                {selectedOption === 'Params' && <ParamTable tabId = {tabId} parseUrl={parseUrl} buildUrl={buildUrl} />}
                {/* {selectedTab === 'Authorization' && <div>Authorization content</div>} */}
                {selectedOption === 'Headers' && <HeaderTable tabId={tabId} />}
                {selectedOption === 'Body' && <BodyPanel tabId={tabId}  />}
            </div>
        </div>
    );
}

export default OptionPanel;
