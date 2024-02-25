# Postkid

## 收获
- Rust全局变量：[OnceLock in std::sync - Rust](https://doc.rust-lang.org/std/sync/struct.OnceLock.html)
- `Accept-Encoding`：该字段表示客户端可以接受的内容编码
- `page.tsx`: special Next.js file that exports a React component, and it's required for the route to be accessible. 

## 踩坑
### 响应显示乱码
当我加上header后，请求中文网站就开始出现诸如`zz��}��$�u߿�\������U}`的乱码。逐个排查后发现是`Accept-Encoding`的原因。我开始的时候是照着Postman的设置来写，写成了` { key: 'Accept-Encoding', value: 'gzip, deflate, br', include: true }`，但实际上~~只有`deflate`是支持的~~似乎也不尽然。我最终的解决办法是干脆不设置。

### 代码编辑框
Body的raw选项，我需要使其代码高亮。开始我直接引入了[PrismJS/prism: Lightweight, robust, elegant syntax highlighting.](https://github.com/PrismJS/prism/)，并在其上进行修改。bug不断，折腾了蛮久。后来才想到我需要的不只是语法高亮，确切地说应该是代码编辑框，这方面应该有现成的库才对。一番寻找，发现[react-simple-code-editor/react-simple-code-editor: Simple no-frills code editor with syntax highlighting](https://github.com/react-simple-code-editor/react-simple-code-editor)符合我的需求。很快就解决了。

## todo
- [ ] 测试post的form-data
- [ ] 实现仿postman的url输入框
- [ ] 实现用户记录保存

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