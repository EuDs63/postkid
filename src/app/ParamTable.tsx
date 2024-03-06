'use client'

import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { paramAtomFamily, urlAtomFamily } from './atom';
import Table from '@/components/table';

function ParamTable({ tabId, parseUrl,buildUrl }: { tabId: number,parseUrl: (url: string) => { key: string, value: string, include: boolean }[],buildUrl: (url: string,params: { key: string, value: string, include: boolean }[]) => string }) {
    const [params, setParams] = useAtom(paramAtomFamily(tabId));

    const [url,setUrl] = useAtom(urlAtomFamily(tabId));

    // 当url变化时解析url
    useEffect(() => {
        if (url) {
            setParams(parseUrl(url));
        }
    }, [url]);

    // 当 params 变化时更新 url
    useEffect(() => {
        setUrl(buildUrl(url,params));
    }, [params]);

    return (
        <>
            <Table params={params} setParams={setParams} />
        </>
    );
}

export default ParamTable;
