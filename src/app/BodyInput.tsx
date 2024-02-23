import { useAtom } from 'jotai';
import React from 'react';
import { bodyAtom } from './atom';
import '../../public/prism.css'
import Prism from '../../public/prism.js'

function BodyInput() {
    const [body, setBody] = useAtom(bodyAtom);

    const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newBody = event.target.value;
        setBody(newBody);
    };

    return (
        <div>
            <label>Body:</label>
            <textarea
                rows={4}
                cols={50}
                value={body.toString()} // Fix: Convert body to string
                onChange={handleBodyChange}
            ></textarea>
            <pre className="line-numbers">
                <code className="language-json" contentEditable="true" onInput={handleBodyChange}>
                    {body.toString()}
                </code>
            </pre>
        </div>
    );
}

export default BodyInput;
