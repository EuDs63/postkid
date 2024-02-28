'use client'

import { useAtom } from 'jotai';
import { bodyAtomFamily } from './atom';
import Editor from 'react-simple-code-editor'
import '../../public/prism.css';
import Prism from '../../public/prism.js';

function BodyInput({ tabId }: { tabId: number }) {
    //const [body, setBody] = useAtom(bodyAtom);
    const [body, setBody] = useAtom(bodyAtomFamily(tabId));

    return (
        <div className="bg-white rounded shadow-md overflow-hidden">
            <Editor
                value={body}
                onValueChange={body => setBody(body)}
                // @ts-ignore
                highlight={body => Prism.highlight(body, Prism.languages.json)} // This line reports an error but works normally
                padding={10}
                className="text-base"
            />
        </div>
    );
}

export default BodyInput;
