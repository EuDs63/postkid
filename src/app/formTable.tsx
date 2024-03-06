'use client'

import { useAtom } from 'jotai';
import React from 'react';
import { formDataAtomFamily } from './atom';
import Table from '@/components/table';

function FormTable({ tabId }: { tabId: number }) {
    const [params, setParams] = useAtom(formDataAtomFamily(tabId));

    return (
        <Table params={params} setParams={setParams} />
    );
}

export default FormTable;
