'use client'
import { SetStateAction, useState } from 'react';
//import Counter from './counter';
import Work from './work/page';

function App() {
    const [currentTab, setCurrentTab] = useState(1); // 当前标签页

    const [tabs, setTabs] = useState([
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
        <div className="container mx-auto mt-4 px-2 flex">
            <div className="mr-4">
                {tabButtons}
                <button
                    onClick={addTab}
                    className="py-2 px-4 rounded-md bg-green-500 text-white mt-4"
                >
                    Add Tab
                </button>
            </div>
            <div>
                {tabContent}
            </div>
        </div>
    );
}

export default App;

