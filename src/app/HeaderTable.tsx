'use client'

import { useAtom } from 'jotai';
import React, {  } from 'react';
import { headerAtomFamily } from './atom';
import Table from '@/components/table';

function HeaderTable({ tabId }: { tabId: number }) {
    const [params, setParams] = useAtom(headerAtomFamily(tabId));

    return (
        <Table params={params} setParams={setParams} />
    );
}

export default HeaderTable;
