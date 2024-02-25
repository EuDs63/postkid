'use client'

import React, { useState } from 'react';
import Home from './work/page';

function TabComponent() {
    const [activeTab, setActiveTab] = useState(0); // 用于跟踪当前活动的标签页

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const tabs = [
        { title: 'Tab 4', content: () => <Home /> }, // 使用函数返回组件
        { title: 'Tab 5', content: () => <Home /> }, // 使用函数返回组件
    ];

    return (
        <div>
            <div className="flex">
                {/* 渲染标签页标题 */}
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`p-2 cursor-pointer ${activeTab === index ? 'bg-gray-200' : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.title}
                    </div>
                ))}
            </div>
            {/* 渲染当前活动的标签页内容 */}
            <div className="mt-4">
                {tabs[activeTab].content()}
            </div>
        </div>
    );
}

export default TabComponent;
