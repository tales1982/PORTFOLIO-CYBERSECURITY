'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import { securityCases, softwareProjects } from '@/data/projects';
import { Wrap, ToneSection, Lines, StatusTag } from '@/components/ui/Layout';
import { DiagramPreview, type DiagramId } from '@/components/ui/Diagram';
import { HOVER_QUERY, REDUCED_QUERY } from '@/hooks/motion';
import type { Locale, Status } from '@/types';

type Preview = { type: 'image'; src: string } | { type: 'diagram'; id: DiagramId } | { type: 'text' };
interface Row { id: string; title: string; kind: string; status: Status; href: string; external: boolean; preview: Preview; group: 'security' | 'software' }

const Head = styled.div`
  display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 1.5rem 4rem; align-items: end;
  margin-bottom: clamp(3rem, 7vw, 6rem);
  h2 { font-size: ${({ theme }) => theme.size.xxl}; }
  p { color: var(--muted); font-size: ${({ theme }) => theme.size.m}; line-height: 1.45; max-width: 30rem; }
  @media (max-width: ${({ theme }) => theme.bp.md}) { grid-template-columns: 1fr; }
`;

const Group = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body}; font-size: ${({ theme }) => theme.size.s}; letter-spacing: 0; font-weight: 500;
  color: var(--muted); padding-bottom: 1rem; margin-top: 3.5rem;
  &:first-of-type { margin-top: 0; }
`;

const List = styled.ul`
  border-top: 1px solid var(--line);
  @media (hover: hover) and (pointer: fine) {
    &:hover li a { opacity: 0.38; }
    &:hover li a:hover { opacity: 1; }
  }
`;

const Item = styled.li`
  border-bottom: 1px solid var(--line);
  a {
    display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 4fr) 9rem 1.5rem; gap: 0.5rem 2rem; align-items: center;
    padding-block: clamp(1.4rem, 3vw, 2.4rem);
    transition: opacity 0.4s ease;
  }
  .title {
    font-family: ${({ theme }) => theme.fonts.display}; font-size: clamp(1.75rem, 3.8vw, 3.4rem); letter-spacing: -0.04em; line-height: 1;
    transition: transform 0.6s ${({ theme }) => theme.ease};
  }
  .kind { color: var(--muted); }
  .status { justify-self: start; }
  svg { width: 1.1rem; height: 1.1rem; transition: transform 0.45s ${({ theme }) => theme.ease}; }
  a:hover .title, a:focus-visible .title { transform: translateX(1.25rem); }
  a:hover svg, a:focus-visible svg { transform: translate(2px, 2px); }
  a[target]:hover svg, a[target]:focus-visible svg { transform: translate(3px, -3px); }
  .thumb { display: none; }

  @media (max-width: ${({ theme }) => theme.bp.md}), (hover: none) {
    a { grid-template-columns: 7.5rem minmax(0, 1fr) 1.25rem; grid-template-areas: 'thumb title arrow' 'thumb kind kind' 'thumb status status'; column-gap: 1.1rem; row-gap: 0.4rem; }
    .thumb { display: block; grid-area: thumb; align-self: start; aspect-ratio: 4 / 3; border-radius: 6px; overflow: hidden; background: var(--paper-2); }
    .thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
    .title { grid-area: title; font-size: clamp(1.35rem, 5.5vw, 2rem); }
    .kind { grid-area: kind; font-size: 0.95rem; line-height: 1.4; }
    .status { grid-area: status; }
    svg { grid-area: arrow; align-self: start; margin-top: 0.3rem; }
    a:hover .title, a:focus-visible .title { transform: none; }
  }
`;

// Floating preview: follows the pointer inside the section (desktop),
// or sits next to the focused row (keyboard).
const Float = styled.div<{ $on: boolean }>`
  position: fixed; left: 0; top: 0; z-index: 20; pointer-events: none;
  width: clamp(18rem, 26vw, 26rem); aspect-ratio: 4 / 3; margin: -9rem 0 0 -13rem;
  border-radius: 10px; overflow: hidden; background: var(--graphite);
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.45);
  transform: scale(${({ $on }) => ($on ? 1 : 0.4)}); opacity: ${({ $on }) => ($on ? 1 : 0)};
  transition: transform 0.5s ${({ theme }) => theme.ease}, opacity 0.3s ease;
  .layer { position: absolute; inset: 0; opacity: 0; transform: scale(1.08); transition: opacity 0.35s ease, transform 0.6s ${({ theme }) => theme.ease}; }
  .layer.on { opacity: 1; transform: none; }
  .layer img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .tag { position: absolute; left: 0.75rem; bottom: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 999px; font-size: 0.75rem; background: rgba(23, 25, 29, 0.85); color: var(--soft); }
`;

const TextPreview = styled.div<{ $small?: boolean }>`
  height: 100%; padding: ${({ $small }) => ($small ? '0.6rem' : '1.75rem')}; background: var(--graphite); color: var(--soft);
  display: flex; flex-direction: column; justify-content: flex-end; gap: 0.35rem;
  font-family: ${({ theme }) => theme.fonts.display}; letter-spacing: -0.02em;
  font-size: ${({ $small }) => ($small ? '0.55rem' : '1.35rem')}; line-height: 1.15;
  span:nth-child(odd) { color: var(--blue-light); }
  ${({ $small }) => $small && css`gap: 0.1rem;`}
`;

function PreviewArt({ p, alt, small = false, dlh }: { p: Preview; alt: string; small?: boolean; dlh: string }) {
  if (p.type === 'image') return <Image src={p.src} alt={alt} width={1200} height={800} sizes={small ? '120px' : '420px'} />;
  if (p.type === 'diagram') return <DiagramPreview id={p.id} />;
  return <TextPreview $small={small} aria-hidden="true">{dlh.split('\n').map((l) => <span key={l}>{l}</span>)}</TextPreview>;
}

export default function WorkIndex() {
  const t = useTranslations('work');
  const tc = useTranslations('common');
  const locale = useLocale() as Locale;
  const sectionRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState(false);

  const rows: Row[] = [
    ...securityCases.map((c): Row => ({
      id: c.id, title: c.title[locale], kind: c.kind[locale], status: c.status, href: `#case-${c.id}`, external: false, group: 'security',
      preview: c.image ? { type: 'image', src: c.image } : c.diagram ? { type: 'diagram', id: c.diagram } : { type: 'text' },
    })),
    ...softwareProjects.map((p): Row => ({
      id: p.id, title: p.name, kind: p.kind[locale], status: 'live', href: p.url, external: true, group: 'software', preview: { type: 'image', src: p.image },
    })),
  ];

  // Pointer following with a little lag; only on devices that can hover.
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });
  useEffect(() => {
    const el = sectionRef.current!;
    const can = window.matchMedia(HOVER_QUERY).matches;
    setHover(can);
    if (!can) return;
    const reduced = window.matchMedia(REDUCED_QUERY).matches;
    const s = pos.current;
    const loop = () => {
      s.x += (s.tx - s.x) * (reduced ? 1 : 0.14);
      s.y += (s.ty - s.y) * (reduced ? 1 : 0.14);
      if (floatRef.current) floatRef.current.style.translate = `${s.x.toFixed(1)}px ${s.y.toFixed(1)}px`;
      s.raf = Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      s.tx = e.clientX; s.ty = e.clientY;
      if (!s.raf) s.raf = requestAnimationFrame(loop);
    };
    el.addEventListener('pointermove', move);
    const leave = () => setActive(null);
    window.addEventListener('scroll', leave, { passive: true });
    return () => { el.removeEventListener('pointermove', move); window.removeEventListener('scroll', leave); cancelAnimationFrame(s.raf); };
  }, []);

  const focusRow = (id: string, el: HTMLElement) => {
    if (!hover) return;
    const r = el.getBoundingClientRect();
    const s = pos.current;
    s.tx = s.x = Math.min(window.innerWidth - 220, r.right - 260);
    s.ty = s.y = r.top + r.height / 2;
    if (floatRef.current) floatRef.current.style.translate = `${s.x}px ${s.y}px`;
    setActive(id);
  };

  const groups: { key: 'security' | 'software'; label: string }[] = [
    { key: 'security', label: t('security') },
    { key: 'software', label: t('software') },
  ];

  return (
    <ToneSection id="work" ref={sectionRef} data-tone="light" aria-labelledby="work-h" style={{ paddingTop: 0 }}>
      <Wrap>
        <Head>
          <Lines id="work-h" text={t('title')} />
          <p>{t('intro')}</p>
        </Head>
        {groups.map((g) => (
          <div key={g.key}>
            <Group id={`work-${g.key}`}>{g.label}</Group>
            <List aria-labelledby={`work-${g.key}`} onPointerLeave={() => setActive(null)}>
              {rows.filter((r) => r.group === g.key).map((r) => (
                <Item key={r.id}>
                  <a href={r.href} {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    onPointerEnter={() => hover && setActive(r.id)}
                    onFocus={(e) => focusRow(r.id, e.currentTarget)}
                    onBlur={() => setActive(null)}>
                    <span className="thumb" aria-hidden="true">
                      <PreviewArt p={r.preview} alt="" small dlh={t('dlhPreview')} />
                    </span>
                    <span className="title">{r.title}</span>
                    <span className="kind">{r.kind}</span>
                    <span className="status"><StatusTag status={r.status} /></span>
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                      <path d={r.external ? 'M2 10 10 2M4 2h6v6' : 'M6 1v10M2 7l4 4 4-4'} />
                    </svg>
                    <span className="visually-hidden">{r.external ? `, ${t('visitSite')} ${tc('newTab')}` : `, ${t('readCase')}`}</span>
                  </a>
                </Item>
              ))}
            </List>
          </div>
        ))}
      </Wrap>
      {hover && (
        <Float ref={floatRef} $on={active !== null} aria-hidden="true">
          {rows.map((r) => (
            <div key={r.id} className={`layer${active === r.id ? ' on' : ''}`}>
              <PreviewArt p={r.preview} alt="" dlh={t('dlhPreview')} />
              {r.preview.type === 'diagram' && <span className="tag">{t('previewDiagram')}</span>}
            </div>
          ))}
        </Float>
      )}
    </ToneSection>
  );
}
