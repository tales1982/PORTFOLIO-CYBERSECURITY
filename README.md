# Tales Lima de Paula — Cybersecurity Portfolio

A professional cybersecurity portfolio website built with Next.js 15, TypeScript, styled-components, Redux, and next-intl.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: styled-components v6 with light/dark theme
- **State Management**: Redux Toolkit
- **Internationalization**: next-intl (English / French)
- **Fonts**: Inter + JetBrains Mono via next/font

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en`.

French version: [http://localhost:3000/fr](http://localhost:3000/fr)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (minimal)
│   └── [locale]/
│       ├── layout.tsx          # Locale layout (html/body + providers)
│       └── page.tsx            # Main page
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky nav with theme/language toggles
│   │   └── Footer.tsx          # Footer with social links
│   ├── sections/
│   │   ├── Hero.tsx            # Full-height hero with shield animation
│   │   ├── About.tsx           # Bio + stats + highlights
│   │   ├── Education.tsx       # Education cards (42, Unigran, DLH)
│   │   ├── Skills.tsx          # Skill pills by category
│   │   ├── Certifications.tsx  # Certification cards with status
│   │   ├── Projects.tsx        # Filterable project cards
│   │   ├── Journey.tsx         # Career timeline
│   │   └── Contact.tsx         # Contact form + social links
│   ├── ui/
│   │   ├── Button.tsx          # Reusable button variants
│   │   ├── Badge.tsx           # Status badges
│   │   ├── Section.tsx         # Layout primitives
│   │   ├── ThemeToggle.tsx     # Light/dark mode toggle
│   │   └── LanguageToggle.tsx  # EN/FR language switcher
│   └── ClientPage.tsx          # Top-level client component
├── data/
│   ├── certifications.ts       # Add your certifications here
│   ├── projects.ts             # Add your projects here
│   ├── education.ts            # Education records
│   └── skills.ts               # Skills by category
├── messages/
│   ├── en.json                 # English translations
│   └── fr.json                 # French translations
├── store/
│   ├── index.ts                # Redux store
│   ├── themeSlice.ts           # Theme (light/dark) state
│   └── languageSlice.ts        # Language (en/fr) state
├── styles/
│   ├── theme.ts                # Light & dark theme tokens
│   └── GlobalStyles.ts         # Global CSS + animations
├── providers/
│   └── Providers.tsx           # Redux + styled-components ThemeProvider
├── hooks/
│   └── useScrollAnimation.ts   # IntersectionObserver scroll hook
├── i18n/
│   └── request.ts              # next-intl config
└── types/
    ├── index.ts                # App-wide TypeScript types
    └── styled.d.ts             # styled-components theme type augmentation
```

## Customization

### Update Your Information

1. **Contact links** — Edit `src/components/sections/Contact.tsx` and `src/components/layout/Footer.tsx` to replace the placeholder email, GitHub, and LinkedIn URLs.

2. **Certifications** — Edit `src/data/certifications.ts`. Add real certification images to `public/images/certifications/`.

3. **Projects** — Edit `src/data/projects.ts` with your real GitHub URLs and demo links.

4. **CV** — Place your CV PDF at `public/cv-tales-lima-de-paula.pdf`.

5. **Translations** — Edit `src/messages/en.json` and `src/messages/fr.json` to adjust any text.

### Add a Certification

```typescript
// src/data/certifications.ts
{
  id: 7,
  name: "Your Certification Name",
  issuer: "Issuing Organization",
  issueDate: "2025-01",
  expirationDate: null,        // null for no expiration
  status: "valid",             // "valid" | "expired" | "noExpiration"
  image: "/images/certifications/your-cert.png",
  credentialUrl: "https://your-credential-url.com"
}
```

### Add a Project

```typescript
// src/data/projects.ts
{
  id: 9,
  name: "My New Project",
  description: "What the project does.",
  technologies: ["Tool1", "Tool2"],
  category: "security",        // "security" | "development" | "blockchain"
  githubUrl: "https://github.com/...",
  demoUrl: null,               // null if no demo
  featured: true
}
```

## Build for Production

```bash
npm run build
npm start
```

## Deploy

This project is ready for deployment on [Vercel](https://vercel.com):

```bash
npx vercel
```
