'use client'

import React from 'react';
import FormTable from './formTable';
import { bodyTypeAtomFamily } from './atom';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';

const DynamicBodyInput = dynamic(() => import('./BodyInput'), { ssr: false });
// import BodyInput from './BodyInput';

function BodyPanel({ tabId }: { tabId: number }) {
    //const [contentType, setContentType] = useAtom(bodyTypeAtom);

    const [contentType, setContentType] = useAtom(bodyTypeAtomFamily(tabId));

    const handleContentTypeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setContentType(event.target.value);
    };

    return (
        <div className="container mx-auto px-4 w-full">
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

            <div className="container">
                {contentType === 'none' && <div className="bg-gray-100 p-4 flex-grow">None Content</div>}
                {contentType === 'form-data' && <FormTable tabId = {tabId} />}
                {/* {contentType === 'raw' && <BodyInput tabId = {tabId} />} */}
                {contentType === 'raw' && <DynamicBodyInput tabId={tabId} />} 
            </div>
        </div>
    );
}

export default BodyPanel;
