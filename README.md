# southsail Blog

Personal technical blog covering cybersecurity, CTF, programming, cryptography and learning notes.

Technology First · Character Themed. Character art is a visual layer only.

## Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — local development
- `npm run lint` — ESLint
- `npm run build` — production build
- `npm run start` — serve the production build

## Deploy

The app is a standard Next.js server deployment. Vercel is the simplest path.

GitHub profile used by the site: [dashuaiw046-alt](https://github.com/dashuaiw046-alt).

1. Create a repository under that account, then push this folder.
2. Import the project in [Vercel](https://vercel.com/new). Root directory is this folder (`southsail_blog`).
3. After the first deploy, copy the production URL.
4. In Vercel → Project → Settings → Environment Variables, set:

```txt
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
NEXT_PUBLIC_GITHUB_URL=https://github.com/dashuaiw046-alt
```

5. Redeploy so `sitemap.xml`, `robots.txt`, and Open Graph URLs use the public origin.
6. Custom domain (optional): Vercel → Project → Settings → Domains, then update `NEXT_PUBLIC_SITE_URL` to that domain and redeploy.

## Add an article

1. Create `content/articles/<slug>.mdx`
2. Add frontmatter:

```md
---
title: ""
description: ""
date: "2026-09-09"
category: ""
tags: []
---
```

3. The list at `/articles` and the page at `/articles/<slug>` are generated automatically.

## Add a CTF writeup

1. Create `content/ctf/<slug>.mdx`
2. Add frontmatter:

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

3. The list at `/ctf` and the page at `/ctf/<slug>` are generated automatically.

## Add a project

Edit `lib/projects.ts` and append an item. Leave `github` / `demo` empty until a real URL exists.

## Add a character theme

1. Put the image in `public/characters/<series>/<file>.png`
2. Add a theme in `lib/themes.ts`
3. Keep the theme `id` stable; the image filename does not have to match the id
