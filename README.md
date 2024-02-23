# Postkid

## 收获
- Rust全局变量：[OnceLock in std::sync - Rust](https://doc.rust-lang.org/std/sync/struct.OnceLock.html)
- `Accept-Encoding`：该字段是

## 踩坑
### 响应显示乱码
当我加上header后，请求中文网站就开始出现诸如`zz��}��$�u߿�\������U}`的乱码。逐个排查后发现是`Accept-Encoding`的原因。我开始的时候是照着Postman的设置来写，写成了` { key: 'Accept-Encoding', value: 'gzip, deflate, br', include: true }`，但实际上~~只有`deflate`是支持的~~似乎也不尽然。我最终的解决办法是干脆不设置。

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## references
- [OnceLock in std::sync - Rust](https://doc.rust-lang.org/std/sync/struct.OnceLock.html)
- [【Rust 日报】2023-11-26 Rust全局变量，两年过去了-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/2364764?areaId=106001)