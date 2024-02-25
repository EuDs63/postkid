'use client'
import React, { useState } from 'react';
import Home from './work/page';
import { ScopeProvider } from 'jotai-scope';
import { anotherCountAtom, countAtom } from './atom';
import Counter from './counter';

function TabComponent() {
    const [activeTab, setActiveTab] = useState(0); // 用于跟踪当前活动的标签页

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const tabs = [
        {
            title: 'Tab 6', content: () => {
                return (
                    <>
                        <div> Tab 6</div>
                        <ScopeProvider atoms={[anotherCountAtom]}>
                            <Counter />
                        </ScopeProvider>
                    </>
                );
            }

        },
        {
            title: 'Tab 7', content: () => {
                return (
                    <ScopeProvider atoms={[anotherCountAtom]}>
                        <Counter />
                    </ScopeProvider>
                );
            }
        }
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

