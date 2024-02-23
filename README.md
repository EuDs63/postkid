# Postkid

## 收获
- Rust全局变量：[OnceLock in std::sync - Rust](https://doc.rust-lang.org/std/sync/struct.OnceLock.html)
- `Accept-Encoding`：该字段是

## 踩坑
### 响应显示乱码
当我加上header后，请求中文网站就开始出现诸如`zz��}��$�u߿�\������U}`的乱码。逐个排查后发现是`Accept-Encoding`的原因。我开始的时候是照着Postman的设置来写，写成了` { key: 'Accept-Encoding', value: 'gzip, deflate, br', include: true }`，但实际上~~只有`deflate`是支持的~~似乎也不尽然。我最终的解决办法是干脆不设置。

## todo
- [ ] 测试post的form-data

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