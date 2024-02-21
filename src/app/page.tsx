import Image from "next/image";
import Greet from "./greet";
import HttpRequestDropdown from "./dropdown";
import PostmanInterface from "./PostmanInterface";
import Tabs from "./tab";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between h-screen w-screen">

      {/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>

      </div> */}

      {/* <HttpRequestDropdown /> */}
      {/* <Greet /> */}
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
        <div className="p-4 rounded-md shadow-md w-screen h-screen">

          <div className="flex flex-row items-center">
            <HttpRequestDropdown />
            <input type="text" className="border border-gray-300 p-2 rounded-md mr-4 w-1/2" placeholder="输入 URL 或粘贴文本" />
            <button className="bg-blue-500 text-white p-2 rounded-md">发送</button>
          </div>
          <Tabs />


        </div>
      </div>
      {/* <PostmanInterface /> */}

    </main>
  );
}
