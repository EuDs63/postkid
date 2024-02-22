import { atom } from "jotai";

// 定义urlAtom
const urlAtom = atom('');

// 定义参数atom
const paramAtom = atom('');

// 定义参数数组atom,由参数派生
const urlArrayAtom = atom((get) => {
    const url = get(urlAtom);
    // 判断url是否为空
    if (url === '') {
        return [{ key: '', value: '', include: true }];
    }else{
        const search = new URL(url).search;
        const params = new URLSearchParams(search);
        const result = [];
        // @ts-ignore
        for (const [key, value] of params) {
            result.push({ key, value, include: true });
        }
        return result;
    }


});

export { urlAtom, urlArrayAtom }