import { atom, useAtom } from 'jotai'
import { countAtom, anotherCountAtom } from './atom'


export default function Counter () {
    const [count, setCount] = useAtom(countAtom)
    const [anotherCount, setAnotherCount] = useAtom(anotherCountAtom)
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
        </>
    )
}