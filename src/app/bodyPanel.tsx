'use client'

import React, { useState } from 'react';
import FormTable from './formTable';
import { bodyTypeAtom, bodyTypeAtomFamily } from './atom';
import { useAtom } from 'jotai';
import BodyInput from './BodyInput';

function BodyPanel( {tabId} ) {
    //const [contentType, setContentType] = useAtom(bodyTypeAtom);

    const [contentType, setContentType] = useAtom(bodyTypeAtomFamily(tabId));

    const handleContentTypeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setContentType(event.target.value);
    };

    return (
        <div className="container mx-auto px-4 ">
            <div className="flex items-center mb-4">
                <input
                    type="radio"
                    id="none"
                    value="none"
                    checked={contentType === 'none'}
                    onChange={handleContentTypeChange}
                    className="mr-2"
                />
                <label htmlFor="none">None</label>

                <input
                    type="radio"
                    id="form-data"
                    value="form-data"
                    checked={contentType === 'form-data'}
                    onChange={handleContentTypeChange}
                    className="ml-4 mr-2"
                />
                <label htmlFor="form-data">Form Data</label>

                <input
                    type="radio"
                    id="raw"
                    value="raw"
                    checked={contentType === 'raw'}
                    onChange={handleContentTypeChange}
                    className="ml-4 mr-2"
                />
                <label htmlFor="raw">Raw</label>
            </div>

            <div>
                {contentType === 'none' && <div className="bg-gray-100 p-4">None Content</div>}
                {contentType === 'form-data' && <FormTable />}
                {contentType === 'raw' && <BodyInput />}
            </div>
        </div>
    );
}

export default BodyPanel;
