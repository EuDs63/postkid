import { atom } from "jotai";

// 定义urlAtom
export const urlAtom = atom('');

// 定义headerAtom
export const headerAtom = atom([
    { key: 'User-Agent', value: 'Mozilla/5.0', include: true },
    { key: 'Accept', value: '*/*', include: true },
    { key: 'Accept-Encoding', value: 'deflate', include: false },
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

// 定义form-dataAtom
export const formDataAtom = atom([
    { key: '', value: '', include: true }
]);

// 定义formDataMapAtom
export const formDataMapAtom = atom((get) => {
    const formData = get(formDataAtom);
    const result = new Map<string, string>();
    formData.forEach(data => {
        if (data.include && data.key !== '' && data.value !== '') {
            result.set(data.key, data.value);
        }
    });
    return result;
});

// 定义bodyTypeAtom:none、form-data、raw
export const bodyTypeAtom = atom('none');

// 定义bodyAtom,类型不确定
export const bodyAtom = atom(' ');

export const countAtom = atom(0)
export const anotherCountAtom = atom(0)