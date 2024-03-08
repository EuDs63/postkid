import { methodAtomFamily } from "@/utils/atom";
import { HttpMethod } from "@/utils/interface";
import { useAtom } from "jotai";

function MethodSelect({tabId}) {
    const [method, setMethod] = useAtom(methodAtomFamily(tabId));

    const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMethod(e.target.value as HttpMethod);
    }

    return (
        <label>
            <select
                className="border border-gray-300 p-2 rounded-md mr-4"
                value={method}
                onChange={handleMethodChange}
            >
                <option className="text-emerald-400" value="GET">GET</option>
                <option className="text-red-400" value="POST">POST</option>
                {/* 添加其他 HTTP 请求方法的选项 */}
            </select>
        </label>
    );
}

export default MethodSelect;
