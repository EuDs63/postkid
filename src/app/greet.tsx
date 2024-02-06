'use client'

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

export default function Greet() {
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        if (name !== '') {
            invoke<string>('greet', { name })
                .then(result => setGreeting(result))
                .catch(console.error);
        }
    }, [name]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <>
            <input type="text" className="text-4xl font-bold" value={name} onChange={handleInputChange} />
            <h1 className="text-4xl font-bold">{greeting}</h1>
        </>
    );
}
