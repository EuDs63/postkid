'use client'
import { useState } from 'react';
//import Counter from './counter';
import Work from './work/page';

function App() {
    const [currentTab, setCurrentTab] = useState(1); // 当前标签页

    type Tab = {
        id: number;
        name: string;
    }

    const [tabs, setTabs] = useState<Tab[]>([
        { id: 1, name: 'Tab 1' },
        { id: 2, name: 'Tab 2' }
    ]); 

    const addTab = () => {
        const nextId = tabs.length + 1;
        setTabs([...tabs, { id: nextId, name: `Tab ${nextId}` }]);
    }

    const tabButtons = tabs.map((tab) => (
        <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`block py-2 px-4 rounded-md mb-2 ${currentTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
        >
            {tab.name}
        </button>
    ));

    const tabContent = tabs.map((tab) => (
        <div key={tab.id} className={`${currentTab === tab.id ? 'block' : 'hidden'}`}>
            {/* <Counter tabId={tab.id} /> */}
            < Work tabId={tab.id} />
        </div>
    ));

    return (
        <div className="container mx-2 mt-4 px-2 flex flex-1">
            <div className="mr-4">
                {tabButtons}
                <button
                    onClick={addTab}
                    className="block py-2 px-4 rounded-md mb-2 flex-grow bg-green-500 text-white"
                >
                    Add
                </button>
            </div>
            <div className='flex-grow'>
                {tabContent}
            </div>
        </div>
    );
}

export default App;

