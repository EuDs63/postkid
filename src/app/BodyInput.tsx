import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { bodyAtom } from './atom';
import '../../public/prism.css';
import Prism from '../../public/prism.js';

function BodyInput() {
    const [body, setBody] = useAtom(bodyAtom);
    const [editedBody, setEditedBody] = useState(body);

    const handleBodyChange = () => {
        const preElement = document.getElementById('editableContent');
        if (preElement) {
            const newBody = preElement.innerText;
            setEditedBody(newBody);
        }
    };

    useEffect(() => {
        Prism.highlightAll();
    }, [editedBody]);

    const handleSave = () => {
        setBody(editedBody);
    };

    return (
        <div>
            <label>Body:</label>
            <pre
                id="editableContent"
                className="line-numbers"
                contentEditable="true"
                onInput={handleBodyChange}
                suppressContentEditableWarning={true} // 隐藏 contentEditable 警告
            >
                <code className="language-json">
                    {editedBody}
                </code>
            </pre>
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default BodyInput;
