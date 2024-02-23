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
            Prism.highlightAll(); // 更新代码高亮
        }
    };

    useEffect(() => {
        Prism.highlightAll(); // 初始化时也进行代码高亮
    }, [body]);

    const handleBlur = () => {
        setBody(editedBody); // 当用户离开 pre 元素时自动保存内容
    };

    return (
        <div>
            <label>Body:</label>
            <pre
                id="editableContent"
                className="line-numbers"
                contentEditable="true"
                onInput={handleBodyChange}
                onBlur={handleBlur}
                suppressContentEditableWarning={true}
            >
                <code className="language-json">
                    {editedBody}
                </code>
            </pre>
        </div>
    );
}

export default BodyInput;
