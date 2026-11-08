// Design tokens.
// Concept: an event moving through systems, Develop → Detect → Respond.
// Graphite and soft white sections alternate; electric blue marks movement
// (pulses, active states, focus) and is never used as decoration.
export const theme = {
  fonts: {
    display: "var(--font-display), 'Funnel Sans', system-ui, sans-serif",
    body: "var(--font-body), system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  // Tone-aware colors: each section sets these variables (see GlobalStyles).
  c: {
    bg: 'var(--bg)',
    fg: 'var(--fg)',
    muted: 'var(--muted)',
    line: 'var(--line)',
    raised: 'var(--raised)',
    accent: 'var(--accent)',
    blue: 'var(--blue)',
  },
  size: {
    s: '0.875rem',
    base: '1.0625rem',
    m: '1.3125rem',
    l: 'clamp(1.5rem, 2.4vw, 2rem)',
    xl: 'clamp(2rem, 4.2vw, 3.5rem)',
    xxl: 'clamp(2.75rem, 7.5vw, 6.5rem)',
    hero: 'clamp(3.4rem, 11.5vw, 11.5rem)',
  },
  wrap: '90rem',
  gutter: 'clamp(1.25rem, 4.5vw, 4rem)',
  bp: { sm: '600px', md: '900px', lg: '1200px' },
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
  radius: 'clamp(1.5rem, 4vw, 3rem)',
};

export type AppTheme = typeof theme;
