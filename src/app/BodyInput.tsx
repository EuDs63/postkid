import { useAtom } from 'jotai';
import { bodyAtom } from './atom';
import Editor from 'react-simple-code-editor'
import '../../public/prism.css';
import Prism from '../../public/prism.js';

function BodyInput() {
    const [body, setBody] = useAtom(bodyAtom);

    return (
        <div className="max-w-md mx-auto bg-white rounded shadow-md overflow-hidden md:max-w-2xl">
            <Editor
                value={body}
                onValueChange={body => setBody(body)}
                highlight={body => Prism.highlight(body, Prism.languages.json)} // This line reports an error but works normally
                padding={10}
                className="text-base"
            />
        </div>
    );
}

export default BodyInput;
