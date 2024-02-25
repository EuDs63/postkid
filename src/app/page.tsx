'use client'
import React, { useState } from 'react';
import Home from './work/page';
import { ScopeProvider } from 'jotai-scope';
import { anotherCountAtom, countAtom, counterAtomFamily } from './atom';
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
                        <ScopeProvider atoms={[anotherCountAtom,counterAtomFamily]}>
                            <Counter tabId={1}/>
                        </ScopeProvider>
                    </>
                );
            }

        },
        {
            title: 'Tab 7', content: () => {
                return (
                    <ScopeProvider atoms={[anotherCountAtom,counterAtomFamily]}>
                        <Counter tabId={2} />
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
            <div>
                {activeTab === 0 && 
                    (
                        <>
                            <div> Tab 6</div>
                            <ScopeProvider atoms={[anotherCountAtom]}>
                                <Counter />
                            </ScopeProvider>
                        </>
                    ) 
                }
                {activeTab === 1 && 
                    (
                    <>
                        <div> Tab 7</div>
                        <ScopeProvider atoms={[anotherCountAtom]}>
                            <Counter />
                        </ScopeProvider>
                    </>
                    )
                }
            </div>
        </div>
    );
}

export default TabComponent;

