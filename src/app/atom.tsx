import { atom } from "jotai";

// 定义urlAtom
export const urlAtom = atom('');

// 定义参数atom
const paramAtom = atom('');

// 定义参数数组atom,由参数派生
// export const urlArrayAtom = atom((get) => {
//     const url = get(urlAtom);
//     // 判断url是否为空
//     if (url === '') {
//         return [{ key: '', value: '', include: true }];
//     }else{
//         const search = new URL(url).search;
//         const params = new URLSearchParams(search);
//         const result = [];
//         // @ts-ignore
//         for (const [key, value] of params) {
//             result.push({ key, value, include: true });
//         }
//         return result;
//     }
// });

// 定义headerAtom
export const headerAtom = atom([
    { key: 'User-Agent', value: 'Mozilla/5.0', include: true },
    { key: 'Accept', value: 'application/json', include: true },
    { key: 'Accept-Encoding', value: 'gzip, deflate, br', include: true },
    { key: 'Content-Type', value: 'application/json', include: true },
    { key: 'Connection', value: 'keep-alive', include: true },
    { key: '', value: '', include: false }
]);

// 定义headerMapAtom
export const headerMapAtom = atom((get) => {
    const headers = get(headerAtom);
    const result = new Map<string, string>();
    headers.forEach(header => {
        // 如果 include 为 true，并且 key 和 value 都不为空，则添加到 map 中
        if (header.include && header.key !== '' && header.value !== '') {
            result.set(header.key, header.value);
        }
    });
    return result;
});
