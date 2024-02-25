'use client'
import { SetStateAction, useState } from 'react';
import Counter from './counter';

function App() {
    const [currentTab, setCurrentTab] = useState(1); // 当前标签页

    const changeTab = (tabId: SetStateAction<number>) => {
        setCurrentTab(tabId);
    };

    return (
        <div>
            <button onClick={() => changeTab(1)}>Tab 1</button>
            <button onClick={() => changeTab(2)}>Tab 2</button>

            {/* 在不同的标签页下分别显示对应的组件 */}
            {/* {currentTab === 1 && <Tab tabId={1} />}
            {currentTab === 2 && <Tab tabId={2} />} */}
            { currentTab === 1 && <Counter tabId={1} />}
            { currentTab === 2 && <Counter tabId={2} />}
        </div>
    );
}

export default App;

