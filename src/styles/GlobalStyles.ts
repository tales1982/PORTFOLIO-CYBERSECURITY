'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --graphite: #17191d;
    --graphite-2: #202328;
    --paper: #eeeff1;
    --paper-2: #e2e4e8;
    --ink: #15171a;
    --soft: #f3f3f1;
    --blue: #2e4bff;
    --blue-light: #8a9cff;
  }

  /* Section tones. Components only read --bg, --fg, --muted, --line, --raised, --accent. */
  [data-tone='dark'] {
    --bg: var(--graphite); --fg: var(--soft); --muted: #a2a7af;
    --line: rgba(243, 243, 241, 0.14); --raised: var(--graphite-2); --accent: var(--blue-light);
    color-scheme: dark;
  }
  [data-tone='light'] {
    --bg: var(--paper); --fg: var(--ink); --muted: #575c65;
    --line: rgba(21, 23, 26, 0.15); --raised: #ffffff; --accent: var(--blue);
    color-scheme: light;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; scroll-padding-top: 5rem; -webkit-text-size-adjust: 100%; background: var(--graphite); }
  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.size.base};
    line-height: 1.6;
    background: var(--bg);
    color: var(--fg);
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
  }
  h1, h2, h3, h4 { font-family: ${({ theme }) => theme.fonts.display}; font-weight: 400; line-height: 1.02; letter-spacing: -0.035em; text-wrap: balance; }
  p { text-wrap: pretty; }
  a { color: inherit; text-decoration: none; }
  img, svg { display: block; max-width: 100%; }
  img { height: auto; }
  ul, ol { list-style: none; }
  button, input, textarea { font: inherit; color: inherit; }
  button { cursor: pointer; background: none; border: 0; }
  :focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; border-radius: 2px; }
  ::selection { background: var(--blue); color: #fff; }
  main:focus { outline: none; }

  .visually-hidden {
    position: absolute !important; width: 1px; height: 1px; overflow: hidden;
    clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
  }
`;
