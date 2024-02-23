import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { bodyAtom } from './atom';

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
        </div>
    );
}

export default BodyInput;
