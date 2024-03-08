'use client'

import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { paramAtomFamily, urlAtomFamily } from './atom';
import Table from '@/components/table';
import { unionBy } from 'lodash';

function ParamTable({ tabId, parseUrl,buildUrl }: { tabId: number,parseUrl: (url: string) => { key: string, value: string, include: boolean }[],buildUrl: (url: string,params: { key: string, value: string, include: boolean }[]) => string }) {
    const [params, setParams] = useAtom(paramAtomFamily(tabId));

    const [url,setUrl] = useAtom(urlAtomFamily(tabId));

    // 当url变化时解析url
    useEffect(() => {
        if (url) {
            // 之前的params
            const oldParams = params.filter(param => !param.include);
            // 解析url得到的params
            const newParams = parseUrl(url);
            // 合并params
            const mergedParams = unionBy(newParams,oldParams,'key');
            setParams(mergedParams);
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
