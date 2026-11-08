'use client';

import { createElement, type CSSProperties, type ReactNode } from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import { useTranslations } from 'next-intl';
import { useInView, useMagnetic } from '@/hooks/motion';
import type { Status } from '@/types';

/* ---------- Layout ---------- */

export const Wrap = styled.div`
  max-width: ${({ theme }) => theme.wrap};
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.gutter};
`;

// A section with its own tone. `$overlap` slides it over the previous one
// with rounded top corners, which is how the page moves between dark and light.
export const ToneSection = styled.section<{ $overlap?: boolean }>`
  position: relative;
  background: var(--bg);
  color: var(--fg);
  padding-block: clamp(5rem, 12vw, 10rem);
  ${({ $overlap, theme }) => $overlap && css`
    margin-top: calc(${theme.radius} * -1);
    border-radius: ${theme.radius} ${theme.radius} 0 0;
    z-index: 1;
  `}
`;

/* ---------- Line-by-line heading reveal ---------- */

export const RevealStyles = createGlobalStyle`
  .ln { display: block; overflow: hidden; padding-bottom: 0.12em; margin-bottom: -0.12em; }
  .ln-i {
    display: block;
    transition: transform 1.1s ${({ theme }) => theme.ease};
    transition-delay: calc(var(--d, 0s) + var(--i, 0) * 0.08s);
  }
  [data-armed='true']:not([data-in='true']) .ln-i { transform: translate3d(0, 112%, 0) rotate(2deg); }
  [data-onload='true'] .ln-i { animation: ln-up 1.15s ${({ theme }) => theme.ease} both; animation-delay: calc(var(--d, 0s) + var(--i, 0) * 0.09s); }
  @keyframes ln-up { from { transform: translate3d(0, 112%, 0) rotate(2deg); } to { transform: none; } }

  /* Image reveal: a mask opening upwards */
  .rv-clip { transition: clip-path 1.3s ${({ theme }) => theme.ease}; clip-path: inset(0 0 0 0); }
  [data-armed='true']:not([data-in='true']) .rv-clip, [data-armed='true']:not([data-in='true']).rv-clip { clip-path: inset(100% 0 0 0); }
`;

type LinesProps = {
  tag?: 'h1' | 'h2' | 'h3' | 'p';
  text: string; // lines separated by \n
  id?: string;
  className?: string;
  onLoad?: boolean; // animate on page load instead of on scroll
  delay?: number;
};

export function Lines({ tag = 'h2', text, id, className, onLoad = false, delay = 0 }: LinesProps) {
  const ref = useInView<HTMLElement>(0.25);
  const lines = text.split('\n');
  return createElement(
    tag,
    { ref: onLoad ? undefined : ref, id, className, 'data-onload': onLoad ? 'true' : undefined },
    lines.map((l, i) => (
      <span className="ln" key={i}>
        <span className="ln-i" style={{ '--i': i, '--d': `${delay}s` } as CSSProperties}>
          {l}
          {i < lines.length - 1 ? ' ' : ''}
        </span>
      </span>
    )),
  );
}

/* ---------- Buttons and links ---------- */

const MagWrap = styled.span`display: inline-block; padding: 0.6rem; margin: -0.6rem;`;

export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useMagnetic<HTMLSpanElement>(strength);
  return <MagWrap ref={ref}>{children}</MagWrap>;
}

const pill = css`
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem;
  min-height: 3.25rem; padding: 0 1.6rem; border-radius: 999px; overflow: hidden; isolation: isolate;
  font-weight: 550; white-space: nowrap;
  transition: color 0.4s ${({ theme }) => theme.ease}, border-color 0.4s ease;
  span[data-magnetic-label] { display: inline-flex; align-items: center; gap: 0.6rem; }
  /* fill rises from the bottom on hover */
  &::before {
    content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
    transform: translateY(101%); transition: transform 0.5s ${({ theme }) => theme.ease};
  }
  &:hover::before, &:focus-visible::before { transform: none; }
`;

export const PillPrimary = styled.a`
  ${pill};
  background: var(--blue); color: #fff;
  &::before { background: var(--fg); }
  &:hover, &:focus-visible { color: var(--bg); }
`;

export const PillGhost = styled.a`
  ${pill};
  border: 1px solid var(--line); color: var(--fg);
  &::before { background: var(--fg); }
  &:hover, &:focus-visible { color: var(--bg); border-color: var(--fg); }
`;

// Text link: underline draws in, arrow nudges toward its direction.
const Arrowed = styled.a<{ $dir: 'ne' | 'e' | 's' }>`
  display: inline-flex; align-items: baseline; gap: 0.4em; font-weight: 550;
  background: linear-gradient(currentColor, currentColor) no-repeat 0 100% / 0% 1px;
  padding-bottom: 0.1em;
  transition: background-size 0.45s ${({ theme }) => theme.ease};
  svg { width: 0.72em; height: 0.72em; flex: none; transition: transform 0.35s ${({ theme }) => theme.ease}; }
  &:hover, &:focus-visible { background-size: 100% 1px; }
  &:hover svg, &:focus-visible svg {
    transform: ${({ $dir }) => ($dir === 'ne' ? 'translate(3px, -3px)' : $dir === 'e' ? 'translateX(4px)' : 'translateY(3px)')};
  }
`;

const ARROWS = {
  ne: 'M2 10 10 2M4 2h6v6',
  e: 'M1 6h10M7 2l4 4-4 4',
  s: 'M6 1v10M2 7l4 4 4-4',
};

export function ArrowLink({ href, children, dir = 'e', external = false, download = false, className }: {
  href: string; children: ReactNode; dir?: 'ne' | 'e' | 's'; external?: boolean; download?: boolean; className?: string;
}) {
  const t = useTranslations('common');
  return (
    <Arrowed href={href} $dir={external ? 'ne' : dir} className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...(download ? { download: true } : {})}>
      {children}
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d={ARROWS[external ? 'ne' : dir]} /></svg>
      {external && <span className="visually-hidden">{t('newTab')}</span>}
    </Arrowed>
  );
}

/* ---------- Status ---------- */

// Shape carries the meaning, so it works without color:
// live = filled, lab = ring, progress = half, training = dashed ring
const Tag = styled.span<{ $s: Status }>`
  display: inline-flex; align-items: center; gap: 0.5rem; font-size: ${({ theme }) => theme.size.s}; font-weight: 550; line-height: 1;
  color: ${({ $s }) => ($s === 'progress' ? 'var(--accent)' : 'var(--fg)')};
  &::before {
    content: ''; width: 0.62rem; height: 0.62rem; border-radius: 50%; flex: none; border: 1.5px solid currentColor;
    ${({ $s }) => $s === 'live' && css`background: currentColor;`}
    ${({ $s }) => $s === 'progress' && css`background: linear-gradient(90deg, currentColor 50%, transparent 50%);`}
    ${({ $s }) => $s === 'training' && css`border-style: dashed;`}
  }
`;

export function StatusTag({ status }: { status: Status }) {
  const t = useTranslations('status');
  return <Tag $s={status}>{t(status)}</Tag>;
}

export const ToolList = styled.ul`
  display: flex; flex-wrap: wrap; gap: 0.4rem;
  li { padding: 0.3rem 0.75rem; border: 1px solid var(--line); border-radius: 999px; font-size: ${({ theme }) => theme.size.s}; color: var(--muted); }
`;

export const Small = styled.p`font-size: ${({ theme }) => theme.size.s}; color: var(--muted);`;
