import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import { HttpMethod, Param } from '@/utils/interface';
// 定义urlAtom
export const urlAtom = atom('');

export const urlAtomFamily = atomFamily((id:number) => {
    return atom('');
});

// 定义paramAtomFamily
export const paramAtomFamily = atomFamily((id:number) => {
    return atom<Param[]>([
        { key: '', value: '', include: true }
    ]);
});

// 定义headerAtom
// export const headerAtom = atom([
//     { key: 'User-Agent', value: 'Mozilla/5.0', include: true },
//     { key: 'Accept', value: '*/*', include: true },
//     { key: 'Accept-Encoding', value: 'deflate', include: false },
//     { key: 'Content-Type', value: 'application/json', include: true },
//     { key: 'Connection', value: 'keep-alive', include: true },
//     { key: '', value: '', include: false }
// ]);

export const headerAtomFamily = atomFamily((id:number) => {
    return atom<Param[]>([
        { key: 'User-Agent', value: 'Mozilla/5.0', include: true },
        { key: 'Accept', value: '*/*', include: true },
        { key: 'Accept-Encoding', value: 'deflate', include: false },
        { key: 'Content-Type', value: 'application/json', include: true },
        { key: 'Connection', value: 'keep-alive', include: true },
        { key: 'Authorization', value: 'Bear ', include: false },
        { key: '', value: '', include: false }
    ]);
});
// 定义headerMapAtom
// export const headerMapAtom = atom((get) => {
//     const headers = get(headerAtom);
//     const result = new Map<string, string>();
//     headers.forEach(header => {
//         // 如果 include 为 true，并且 key 和 value 都不为空，则添加到 map 中
//         if (header.include && header.key !== '' && header.value !== '') {
//             result.set(header.key, header.value);
//         }
//     });
//     return result;
// });

export const headerMapAtomFamily = atomFamily((id:number) => {
    return atom((get) => {
        const headers = get(headerAtomFamily(id));
        const result = new Map<string, string>();
        headers.forEach(header => {
            // 如果 include 为 true，并且 key 和 value 都不为空，则添加到 map 中
            if (header.include && header.key !== '' && header.value !== '') {
                result.set(header.key, header.value);
            }
        });
        return result;
    });
}
);

// 定义form-dataAtom
// export const formDataAtom = atom([
//     { key: '', value: '', include: true }
// ]);

export const formDataAtomFamily = atomFamily((id:number) => {
    return atom<Param[]>([
        { key: '', value: '', include: true }
    ]);
});

// 定义formDataMapAtom
// export const formDataMapAtom = atom((get) => {
//     const formData = get(formDataAtom);
//     const result = new Map<string, string>();
//     formData.forEach(data => {
//         if (data.include && data.key !== '' && data.value !== '') {
//             result.set(data.key, data.value);
//         }
//     });
//     return result;
// });

export const formDataMapAtomFamily = atomFamily((id:number) => {
    return atom((get) => {
        const formData = get(formDataAtomFamily(id));
        const result = new Map<string, string>();
        formData.forEach(data => {
            if (data.include && data.key !== '' && data.value !== '') {
                result.set(data.key, data.value);
            }
        });
        return result;
    }
    );
}
);

// 定义bodyTypeAtom:none、form-data、raw
export const bodyTypeAtom = atom('none');

export const bodyTypeAtomFamily = atomFamily((id:number) => {
    return atom('none');
});

// 定义bodyAtom,类型不确定
//export const bodyAtom = atom(' ');

export const bodyAtomFamily = atomFamily((id:number) => {
    return atom(' ');
});

// 以下为测试用
export const countAtom = atom(0)
export const anotherCountAtom = atom(0)

export const counterAtomFamily = atomFamily((tabId:number) => {
    return atom({
        count: 0,
    });
});

export const tabCounterAtomFamily = atomFamily((id:number) => {
    return atom(0); // 每个标签页都有一个计数器，初始为 0
});



export const methodAtomFamily = atomFamily((id:number) => {
    return atom(HttpMethod.GET);
});
