# southsail Blog 项目总结

> Technology First · Character Themed  
> southsail 的个人技术博客。技术内容是主体，角色主题只做视觉层。

---

## 1. 项目是什么

这是一个已经上线的静态个人技术博客。

| 项 | 内容 |
| --- | --- |
| 站点 | https://southsail.netlify.app |
| 仓库 | https://github.com/dashuaiw046-alt/southsail_blog |
| 作者 | southsail（GitHub：`dashuaiw046-alt`） |
| 本地路径 | `D:\southsail_blog\southsail_blog` |
| 定位 | Cybersecurity / CTF / Cryptography / Programming / Learning Notes |

角色立绘（原神 / 崩铁）只用于：

- 背景
- 配色
- UI 氛围
- 主题皮肤

没有游戏世界观、任务系统或剧情式结构。

---

## 2. 当前状态

**第一版已完成，并已部署。**

已实现：

- 全站路由与统一布局
- MDX 文章 / CTF 内容系统
- 角色主题 + 明暗外观
- SEO（title、description、Open Graph、robots、sitemap）
- Netlify 自动部署
- 本地一键发布 Markdown 笔记

未做（有意不做）：

- 数据库、登录、评论、点赞、后台 CMS
- 网站内直接上传文件
- 搜索、RSS

内容方面：现在仓库里还是示例笔记。真实笔记需要你之后用发布脚本或直接改 `content/` 添加。

---

## 3. 技术栈

- Next.js 16（App Router、Turbopack）
- React 19 + TypeScript strict
- Tailwind CSS 4
- MDX：`next-mdx-remote` + `gray-matter` + `remark-gfm`
- 代码高亮：`rehype-pretty-code` + Shiki
- 动画：Framer Motion
- 部署：Netlify（`@netlify/plugin-nextjs`）

优先 Server Components。只有主题切换、导航菜单、代码复制、动画等交互使用 `"use client"`。

---

## 4. 路由

| 路径 | 说明 |
| --- | --- |
| `/` | 首页：Hero + 最新文章 + 最近 CTF + 项目 + About |
| `/articles` | 文章列表（自动读 `content/articles/`） |
| `/articles/[slug]` | 文章详情 |
| `/ctf` | CTF 列表（自动读 `content/ctf/`） |
| `/ctf/[slug]` | CTF writeup 详情 |
| `/projects` | 项目卡片（数据在 `lib/projects.ts`） |
| `/about` | 关于 |
| `/settings` | 外观与角色主题 |

共享组件：

- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `components/layout/PageShell.tsx`

内部跳转全部用 Next.js `Link`。

---

## 5. 目录结构

```text
southsail_blog/
├── app/                     路由与 SEO
├── components/
│   ├── article/             文章渲染、TOC、代码块
│   ├── ctf/
│   ├── layout/
│   ├── project/
│   ├── theme/               主题与立绘背景
│   └── ui/
├── content/
│   ├── articles/            文章 MDX
│   └── ctf/                 CTF MDX
├── lib/
│   ├── content.ts           读 MDX、frontmatter、TOC
│   ├── projects.ts          项目数据
│   ├── themes.ts            角色主题唯一数据源
│   ├── theme-store.ts       主题状态（localStorage）
│   └── site.ts              站点名、URL、GitHub
├── public/characters/       本地角色立绘
├── scripts/                 发布笔记脚本
├── netlify.toml
└── PROJECT.md               本文件
```

---

## 6. 角色主题

主题 ID **不要改**。ID 和图片文件名不是一回事。

| 主题 ID | 中文名 | 立绘 |
| --- | --- | --- |
| `default` | 默认 | 无 |
| `aodaita` | 奥黛塔 | `/characters/genshin/aodaita.png` |
| `gelunbiya` | 哥伦比娅 | `/characters/genshin/gelunbiya.png` |
| `sanduonie` | 桑多涅 | `/characters/genshin/sangduonie.png` |
| `feiying` | 绯英 | `/characters/starrail/feiying.png` |
| `yaoguangying` | 爻光 | `/characters/starrail/yaoguang.png` |

配置只写在 `lib/themes.ts`。`CharacterBackground` 从这里读图。

- 首页 Hero：立绘较完整
- 其他页面：同一张立绘做右侧淡背景，不挡正文
- 手机端不显示立绘
- 外观：Dark / Light / System，和角色主题共用一套 `ThemeProvider`
- 持久化：`localStorage` 的 `southsail-theme`、`southsail-appearance`

新增角色：把图放到 `public/characters/`，再在 `themes.ts` 加一项。

---

## 7. 内容系统

### 文章 `content/articles/<slug>.mdx`

```md
---
title: ""
description: ""
date: "2026-09-09"
category: ""
tags: []
---
```

详情页包含：标题、简介、日期、分类、标签、阅读时间、正文、TOC、上一篇 / 下一篇。

正文支持：标题、段落、引用、列表、表格、图片、链接、行内代码、代码块（语言、文件名、复制、高亮）。

### CTF `content/ctf/<slug>.mdx`

```md
---
title: ""
category: ""
difficulty: 3
platform: ""
date: "2026-09-09"
tags: []
---
```

详情页显示题目、分类、难度、平台、日期、Writeup。渲染复用文章系统。

### 项目

编辑 `lib/projects.ts`。没有真实 GitHub / Demo 地址就留空，不要伪造。

当前示例内容：

- 文章：SQL Injection、文件上传、XXE
- CTF：Web 参数污染、RSA 参数复用
- 项目：Personal Blog、AI Coding Platform

---

## 8. 如何发布笔记

**没有网页后台。** 笔记进入 Git 仓库后，Netlify 会自动更新站点。

### 桌面一键（推荐）

桌面快捷方式：`southsail-publish`

双击后：

1. 弹出文件选择框，选任意 `.md` / `.mdx`（可多选）
2. 再选模块：Articles 或 CTF
3. 自动 commit + push
4. 窗口留着看结果

启动文件：`scripts/publish-note.cmd`

### 命令行

```powershell
cd D:\southsail_blog\southsail_blog
npm run note
```

或指定文件：

```powershell
npm run note -- D:\notes\sql.md
npm run note -- --ctf D:\notes\rsa.md
```

相关文件：

- `scripts/publish.mjs` 主逻辑
- `scripts/pick-note.ps1` 文件框 / 模块选择框

推送使用 SSH：`git@github.com:dashuaiw046-alt/southsail_blog.git`  
本机密钥：`C:\Users\31205\.ssh\id_ed25519_github`（走 443 端口，因为 HTTPS 会被重置）

---

## 9. 本地开发

```powershell
cd D:\southsail_blog\southsail_blog
npm install
npm run dev
```

打开 http://localhost:3000

```text
npm run lint
npm run build
npm run start
npm run note
```

---

## 10. 部署

当前托管在 **Netlify**，不在 Vercel（Vercel 账号工单 `01528299` 未完成，已改用 Netlify）。

- 生产域名：https://southsail.netlify.app
- 构建：push `master` 自动部署
- 环境变量：

```txt
NEXT_PUBLIC_SITE_URL=https://southsail.netlify.app
NEXT_PUBLIC_GITHUB_URL=https://github.com/dashuaiw046-alt
```

改域名后必须重新 Trigger deploy，sitemap / robots / Open Graph 才会更新。

以后绑自定义域名：改 `NEXT_PUBLIC_SITE_URL`，再部署一次。

---

## 11. 设计原则

- 技术博客优先，角色主题是皮肤
- 现代、克制、偏 Vercel / Linear 气质，暗色为主
- 动画为阅读服务，不做满屏粒子或 3D
- 角色图只用本地 `public/characters`，不抓官方资源
- 不伪造获奖、成绩、公司经历、技能百分比

---

## 12. 接下来可以做的

按优先级：

1. 用桌面快捷方式发布自己的真实笔记
2. 有真实仓库时，把项目 GitHub / Demo 填进 `lib/projects.ts`
3. 有自己的域名时，在 Netlify 绑定并更新 `NEXT_PUBLIC_SITE_URL`
4. 可选下一阶段：搜索、RSS、仅自己能登录的 Git 后台

第一版目标已经完成。
