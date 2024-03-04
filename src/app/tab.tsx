'use client'
import React, { useCallback, useState } from 'react';
import ParamTable from './ParamTable';
import HeaderTable from './HeaderTable';
import BodyPanel from './bodyPanel';

function TabItem({ tabName, selectedTab, onClick }: { tabName: string, selectedTab: string, onClick: (tabName: string) => void }) {
    return (
        <div
            className={`cursor-pointer px-4 py-2 border-b-2 ${selectedTab === tabName ? 'border-blue-500' : ''}`}
            onClick={() => onClick(tabName)}
        >
            {tabName}
        </div>
    );
}

function Tabs({ tabId }: { tabId: number }) {
    const [selectedTab, setSelectedTab] = useState('Params');

    const handleTabChange = (tabName: React.SetStateAction<string>) => {
        setSelectedTab(tabName);
    };

    // 解析url
    // 使用 useCallback 缓存函数，避免每次渲染都创建新的函数
    const parseUrl = useCallback((url: string) => {
        //先判断url是否符合URL
        if (!url) {
            return [{ key: '', value: '', include: false }];
        }

        // 获取查询字符串
        const search = url.split('?')[1];
        if (!search) {
            return [{ key: '', value: '', include: false }];
        }
        const params = new URLSearchParams(search);

        // 不使用 URL 对象，因为 URL 对象会自动解码参数
        // const search = new URL(url).search;
        // const params = new URLSearchParams(search);

        const result = [];
        // @ts-ignore
        for (const [key, value] of params) {
            result.push({ key, value, include: true });
        }
        result.push({ key: '', value: '', include: false });
        return result;
    }, []);

    return (
        <div className="py-2 border-gray-500">
            <div className="flex mb-4">
                <TabItem tabName="Params" selectedTab={selectedTab} onClick={handleTabChange} />
                {/* <TabItem tabName="Authorization" selectedTab={selectedTab} onClick={handleTabChange} /> */}
                <TabItem tabName="Headers" selectedTab={selectedTab} onClick={handleTabChange} />
                <TabItem tabName="Body" selectedTab={selectedTab} onClick={handleTabChange} />
            </div>
            <div className="border border-gray-500 rounded-md p-4 mb-2">
                {/* 根据选中的 tab 显示对应的内容 */}
                {selectedTab === 'Params' && <ParamTable tabId = {tabId} parseUrl={parseUrl}/>}
                {/* {selectedTab === 'Authorization' && <div>Authorization content</div>} */}
                {selectedTab === 'Headers' && <HeaderTable tabId={tabId} />}
                {selectedTab === 'Body' && <BodyPanel tabId={tabId}  />}
            </div>
        </div>
    );
}

export default Tabs;
