'use client'
import React, { useState } from 'react';

function Tabs() {
    const [selectedTab, setSelectedTab] = useState('Params');

    const handleTabChange = (tabName: React.SetStateAction<string>) => {
        setSelectedTab(tabName);
    };

    return (
        <div className="p-4">
            <div className="flex mb-4">
                <TabItem tabName="Params" selectedTab={selectedTab} onClick={handleTabChange} />
                <TabItem tabName="Authoritarian" selectedTab={selectedTab} onClick={handleTabChange} />
                <TabItem tabName="Headers" selectedTab={selectedTab} onClick={handleTabChange} />
                <TabItem tabName="Body" selectedTab={selectedTab} onClick={handleTabChange} />
            </div>
            <div className="border border-gray-300 p-4">
                {/* 根据选中的 tab 显示对应的内容 */}
                {selectedTab === 'Params' && <div>Params content</div>}
                {selectedTab === 'Authoritarian' && <div>Authoritarian content</div>}
                {selectedTab === 'Headers' && <div>Headers content</div>}
                {selectedTab === 'Body' && <div>Body content</div>}
            </div>
        </div>
    );
}

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

export default Tabs;
