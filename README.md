# Postkid

## 收获
- Rust全局变量：[OnceLock in std::sync - Rust](https://doc.rust-lang.org/std/sync/struct.OnceLock.html)
- `Accept-Encoding`：该字段表示客户端可以接受的内容编码
- `page.tsx`: special Next.js file that exports a React component, and it's required for the route to be accessible. 
- `css优先级`

## 踩坑
### 响应显示乱码
当我加上header后，请求中文网站就开始出现诸如`zz��}��$�u߿�\������U}`的乱码。逐个排查后发现是`Accept-Encoding`的原因。我开始的时候是照着Postman的设置来写，写成了` { key: 'Accept-Encoding', value: 'gzip, deflate, br', include: true }`，但实际上~~只有`deflate`是支持的~~似乎也不尽然。我最终的解决办法是干脆不设置。

### 代码编辑框
Body的raw选项，我需要使其代码高亮。开始我直接引入了[PrismJS/prism](https://github.com/PrismJS/prism/)，并在其上进行修改。bug不断，折腾了蛮久。

后来才想到我需要的不只是语法高亮，确切地说应该是代码编辑框，这方面应该有现成的库才对。一番寻找，发现[react-simple-code-editor/react-simple-code-editor](https://github.com/react-simple-code-editor/react-simple-code-editor)符合我的需求。很快就解决了。

### 标签页多开
我先做好了`./work/page`这个组件。接下来我希望实现类似于Postman的多标签页，每个标签页都是用同样的组件，但它们互相独立。

本来这并不是件难事，但因为我之前偷懒，高度依赖jotai的atom来做状态管理,因此花了好些时间。

先尝试了[jotaijs/jotai-scope](https://github.com/jotaijs/jotai-scope),它给的示例确实符合我的需求，但当标签切走再切回去的时候，原来的状态就被重置了，我找不到问题所在，放弃。

中途多次问ChatGPT和Gemini，都是一开始看着很可行，然后实际不行，再问就开始重复之前的回答了。

最后是靠[Devv](https://devv.ai/zh)解决的，它说[Jotai的atomFamily](https://jotai.org/docs/utilities/family)能解决。`atomFamily`允许创建一组相关的原子，并为每个实例提供一个唯一的标识符。一试,确实可行。

现在再看我的实现，感觉还是比较简陋的。每个标签页对应一个特定的`tagId`，然后`atomFamily`就是"a Map whose key is a param and whose value is an atom config"。

## cargo tauri build
**没想到整个过程会这么折磨，一个问题解决后，新的问题又出现了。**

### Failed to fetch Inter from Google Fonts.
参考[Error 'Failed to fetch `Noto Sans JP` from Google Fonts.' · Issue #45080 · vercel/next.js](https://github.com/vercel/next.js/issues/45080#issuecomment-1680665108)

### Type 'number' is not assignable to type 'never'.
排查无果，我选择修改`next.config.mjs`，`dangerously produce production code even when your application has errors`。

参考[next.config.js Options: typescript | Next.js](https://nextjs.org/docs/app/api-reference/next-config-js/typescript)

### ReferenceError: navigator is not defined
这个报错刚开始让我觉得莫名奇妙，因为我记得自己没用到navigator。搜索后发现是我引入的`prism.js`使用到了。

而报这个错的原因又与tauri有关:Tauri不支持Next.js的ssr模式。
>Next.js is a React Framework that comes with both Server-Side Rendering (SSR) and Static-Site Generation (SSG) capabilities. To make Next.js work with Tauri we are going to use the SSG mode since it generates only static files that can be included in the final binary.

我最终的解决方法是参考[高级特性: 动态导入（Import） | Next.js | Next.js中文网](https://www.nextjs.cn/docs/advanced-features/dynamic-import)，将使用到prism的组件动态引入。

### WixTools安装失败
> Connection Failed: Connect error: 由于连接方在一段时间后没有正确答复或连接 的主机没有反应，连接尝试失败。 (os error 10060)

参考[[如何解决安装失败] · Issue #7338 · tauri-apps/tauri](https://github.com/tauri-apps/tauri/issues/7338#issuecomment-1923680714)。

## todo
- [ ] 测试post的form-data
- [x] 实现仿postman的url输入框
- [x] 实现多开标签页
- [x] 实现用户记录保存

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## references
- [OnceLock in std::sync - Rust](https://doc.rust-lang.org/std/sync/struct.OnceLock.html)
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [【Rust 日报】2023-11-26 Rust全局变量，两年过去了-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/2364764?areaId=106001)
- [PrismJS/prism: Lightweight, robust, elegant syntax highlighting.](https://github.com/PrismJS/prism/)
- [react-simple-code-editor/react-simple-code-editor: Simple no-frills code editor with syntax highlighting](https://github.com/react-simple-code-editor/react-simple-code-editor)
- [React 中后台系统多页签实现 ｜ 项目复盘 - 掘金](https://juejin.cn/post/6941683774153293837)
- [Family — Jotai, primitive and flexible state management for React](https://jotai.org/docs/utilities/family)
- [[如何解决安装失败] · Issue #7338 · tauri-apps/tauri](https://github.com/tauri-apps/tauri/issues/7338#issuecomment-1923680714)
- [高级特性: 动态导入（Import） | Next.js | Next.js中文网](https://www.nextjs.cn/docs/advanced-features/dynamic-import)