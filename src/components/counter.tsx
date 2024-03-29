import { useAtom } from 'jotai'
import { countAtom, anotherCountAtom, counterAtomFamily, tabCounterAtomFamily } from '../utils/atom'


export default function Counter({ tabId }: { tabId: number }) {
    const [count, setCount] = useAtom(countAtom)
    const [anotherCount, setAnotherCount] = useAtom(anotherCountAtom)
    const [count3, setCount3] = useAtom(counterAtomFamily(tabId));
    const [count4, setCount4] = useAtom(tabCounterAtomFamily(tabId));

    return (
        <>
            <div>
                <span>count: {count}</span>
                <button type="button" onClick={() => setCount((c) => c + 1)}>
                    increment
                </button>
            </div>
            <div>
                <span>another count: {anotherCount}</span>
                <button type="button" onClick={() => setAnotherCount((c) => c + 1)}>
                    increment
                </button>
            </div>
            <div>
                <span>count3: {count3.count}</span>
                <button type="button" onClick={() => setCount3((c) => ({ count: c.count + 1 }))}>
                    increment
                </button>
            </div>
            <div>
                <span>count4: {count4}</span>
                <button type="button" onClick={() => setCount4((c) => c + 1)}>
                    increment
                </button>
            </div>
        </>
    )
}