# Tales Lima de Paula — Cybersecurity Portfolio

A professional cybersecurity portfolio website built with Next.js 15, TypeScript, styled-components, Redux, and next-intl.

## Tech Stack

- **Framework**: Next.js 15 (App Router), TypeScript
- **Styling**: styled-components v6, light theme by default with an optional dark theme
- **Internationalization**: next-intl (English / French)
- **Fonts**: Bricolage Grotesque (headings) and Public Sans (text) via next/font
- **Contact form**: Formspree

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000. You are redirected to `/en`; the French version is at `/fr`.

## Where to edit the content

| What | File |
|---|---|
| All page text (EN / FR) | `src/messages/en.json`, `src/messages/fr.json` |
| Projects | `src/data/projects.ts` (images in `public/images/projects/`) |
| Work and studies (Path) | `src/data/path.ts` |
| Skills | `src/data/skills.ts` |
| Certifications | `src/data/certifications.ts` (images in `public/images/certifications/`) |
| CV files | `public/cv/` |
| Colors and type | `src/styles/theme.ts` |

## Page structure

```
src/components/
├── layout/   Header.tsx, Footer.tsx
├── sections/ Hero.tsx (with the "Now" panel), Projects.tsx, Path.tsx,
│             Skills.tsx, Certifications.tsx, About.tsx, Contact.tsx
└── ui/       Layout.tsx, ThemeToggle.tsx, LanguageToggle.tsx
```

## Writing style

Text is written in the first person, in short, plain sentences, and only states facts that
can be checked (dates and courses follow the CV in `public/cv/`).
