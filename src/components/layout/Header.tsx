'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import { Magnetic, ArrowLink } from '@/components/ui/Layout';
import { CV_FILES, EMAIL, LINKS as SOCIAL } from '@/data/contact';

const LINKS = ['work', 'about', 'skills', 'experience', 'contact'] as const;
const LANGS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
];

const Bar = styled.header<{ $tone: string }>`
  position: fixed; inset: 0 0 auto 0; z-index: 60;
  padding: 1.1rem ${({ theme }) => theme.gutter};
  display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
  color: ${({ $tone }) => ($tone === 'light' ? 'var(--ink)' : 'var(--soft)')};
  transition: color 0.4s ease;
  pointer-events: none;
  > * { pointer-events: auto; }
`;

const Mark = styled.a`
  font-family: ${({ theme }) => theme.fonts.display}; font-size: 1.05rem; letter-spacing: -0.02em; white-space: nowrap;
  .full { display: inline; } .short { display: none; }
  @media (max-width: ${({ theme }) => theme.bp.sm}) { .full { display: none; } .short { display: inline; } }
`;

const Inline = styled.nav<{ $hidden: boolean }>`
  display: flex; align-items: center; gap: 2rem; margin-left: auto;
  transition: opacity 0.4s ease, transform 0.5s ${({ theme }) => theme.ease};
  ul { display: flex; gap: 1.75rem; }
  a { position: relative; font-size: 0.95rem; }
  a::after { content: ''; position: absolute; left: 0; right: 0; bottom: -0.2rem; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform 0.45s ${({ theme }) => theme.ease}; }
  a:hover::after, a:focus-visible::after { transform: scaleX(1); transform-origin: left; }
  ${({ $hidden }) => $hidden && css`opacity: 0; transform: translateY(-0.75rem); visibility: hidden; transition: opacity 0.3s ease, transform 0.4s ease, visibility 0s 0.4s;`}
  @media (max-width: ${({ theme }) => theme.bp.md}) { display: none; }
`;

const Langs = styled.ul`
  display: flex; gap: 0.25rem; font-size: 0.85rem;
  a { padding: 0.35rem 0.5rem; opacity: 0.55; transition: opacity 0.2s ease; }
  a[aria-current='page'], a:hover { opacity: 1; }
`;

const MenuBtn = styled.button<{ $show: boolean; $open: boolean }>`
  display: inline-flex; align-items: center; gap: 0.7rem; height: 3rem; padding: 0 1.25rem 0 1.1rem;
  border-radius: 999px; font-weight: 550; color: #fff;
  background: ${({ $open }) => ($open ? 'transparent' : 'var(--blue)')};
  border: 1px solid ${({ $open }) => ($open ? 'rgba(255,255,255,0.3)' : 'var(--blue)')};
  transition: transform 0.5s ${({ theme }) => theme.ease}, opacity 0.3s ease, background-color 0.3s ease;
  i { position: relative; width: 16px; height: 8px; }
  i::before, i::after { content: ''; position: absolute; left: 0; width: 100%; height: 1.5px; background: currentColor; transition: transform 0.4s ${({ theme }) => theme.ease}; }
  i::before { top: 0; } i::after { bottom: 0; }
  ${({ $open }) => $open && css`i::before { transform: translateY(3.25px) rotate(45deg); } i::after { transform: translateY(-3.25px) rotate(-45deg); }`}
  @media (min-width: 901px) {
    ${({ $show }) => !$show && css`transform: scale(0.6); opacity: 0; visibility: hidden;`}
  }
`;

/* ---------- Full-screen menu ---------- */

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed; inset: 0; z-index: 55;
  background: var(--graphite); color: var(--soft);
  display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 4fr); gap: 2rem 4rem; align-content: end;
  padding: 7rem ${({ theme }) => theme.gutter} clamp(2rem, 5vw, 4rem);
  overflow-y: auto; overscroll-behavior: contain;
  clip-path: inset(0 0 100% 0);
  visibility: hidden;
  transition: clip-path 0.8s ${({ theme }) => theme.ease}, visibility 0s 0.8s;
  ${({ $open }) => $open && css`clip-path: inset(0 0 0 0); visibility: visible; transition: clip-path 0.8s ${({ theme }) => theme.ease};`}
  @media (max-width: ${({ theme }) => theme.bp.md}) { grid-template-columns: 1fr; align-content: start; padding-top: 6rem; }

  .links li { overflow: hidden; border-top: 1px solid rgba(243, 243, 241, 0.12); }
  .links li:last-child { border-bottom: 1px solid rgba(243, 243, 241, 0.12); }
  .links a {
    display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-block: 0.35rem;
    font-family: ${({ theme }) => theme.fonts.display}; font-size: clamp(2.25rem, 6.5vw, 5.25rem); letter-spacing: -0.04em; line-height: 1.1;
    transform: translateY(105%); transition: transform 0.9s ${({ theme }) => theme.ease}, color 0.3s ease;
    transition-delay: calc(0.18s + var(--i) * 0.06s), 0s;
  }
  .links a svg { width: 0.5em; height: 0.5em; opacity: 0; transform: translateX(-1rem); transition: opacity 0.3s ease, transform 0.45s ${({ theme }) => theme.ease}; }
  .links a:hover, .links a:focus-visible { color: var(--blue-light); }
  .links a:hover svg, .links a:focus-visible svg { opacity: 1; transform: none; }
  ${({ $open }) => $open && css`.links a { transform: none; }`}

  aside { display: grid; gap: 2rem; align-content: end; opacity: 0; transition: opacity 0.6s ease 0.4s; }
  ${({ $open }) => $open && css`aside { opacity: 1; }`}
  aside h3 { font-family: ${({ theme }) => theme.fonts.body}; font-size: 0.85rem; letter-spacing: 0; color: #a2a7af; margin-bottom: 0.6rem; font-weight: 500; }
  aside li + li { margin-top: 0.35rem; }
`;

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState('dark');
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Header color follows the section underneath it.
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('main [data-tone], footer[data-tone]')];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setTone((e.target as HTMLElement).dataset.tone ?? 'dark')),
      { rootMargin: '0px 0px -94% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const close = useCallback((restore = true) => {
    setOpen(false);
    if (restore) btnRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current!;
    const focusables = () => [btnRef.current!, ...panel.querySelectorAll<HTMLElement>('a[href], button')];
    const first = panel.querySelector<HTMLElement>('.links a');
    const timer = window.setTimeout(() => first?.focus(), 250);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      const list = focusables();
      const i = list.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); list[list.length - 1].focus(); }
      else if (!e.shiftKey && i === list.length - 1) { e.preventDefault(); list[0].focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { window.clearTimeout(timer); document.removeEventListener('keydown', onKey); };
  }, [open, close]);

  const langList = (
    <Langs>
      {LANGS.map((l) => (
        <li key={l.code}>
          <a href={`/${l.code}`} hrefLang={l.code} lang={l.code} aria-current={l.code === locale ? 'page' : undefined}>
            <span aria-hidden="true">{l.label}</span><span className="visually-hidden">{l.name}</span>
          </a>
        </li>
      ))}
    </Langs>
  );

  return (
    <>
      <Bar $tone={open ? 'dark' : tone}>
        <a className="visually-hidden" href="#main" onFocus={(e) => e.currentTarget.classList.remove('visually-hidden')} onBlur={(e) => e.currentTarget.classList.add('visually-hidden')}>{t('skip')}</a>
        <Mark href="#top" aria-label={t('home')}><span className="full">Tales Lima de Paula</span><span className="short">Tales Lima</span></Mark>
        <Inline aria-label={t('label')} $hidden={scrolled || open}>
          <ul>{LINKS.map((k) => <li key={k}><a href={`#${k}`}>{t(k)}</a></li>)}</ul>
          <nav aria-label={t('language')}>{langList}</nav>
        </Inline>
        <Magnetic strength={0.25}>
          <MenuBtn ref={btnRef} type="button" $show={scrolled || open} $open={open}
            aria-expanded={open} aria-controls="site-menu" onClick={() => (open ? close() : setOpen(true))}>
            <i aria-hidden="true" />
            <span data-magnetic-label>{open ? t('close') : t('menu')}</span>
          </MenuBtn>
        </Magnetic>
      </Bar>

      <Overlay id="site-menu" ref={panelRef} $open={open} role="dialog" aria-modal="true" aria-label={t('menuTitle')} data-tone="dark">
        <nav aria-label={t('label')}>
          <ul className="links">
            {LINKS.map((k, i) => (
              <li key={k}>
                <a href={`#${k}`} style={{ '--i': i } as React.CSSProperties} onClick={() => close(false)} tabIndex={open ? 0 : -1}>
                  {t(k)}
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M1 6h10M7 2l4 4-4 4" /></svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <aside>
          <div>
            <h3>{t('reach')}</h3>
            <ul>
              <li><ArrowLink href={`mailto:${EMAIL}`}>{EMAIL}</ArrowLink></li>
              <li><ArrowLink href={SOCIAL.linkedin} external>LinkedIn</ArrowLink></li>
              <li><ArrowLink href={SOCIAL.github} external>GitHub</ArrowLink></li>
              <li><ArrowLink href={CV_FILES[locale] ?? CV_FILES.en} dir="s" download>CV (PDF)</ArrowLink></li>
            </ul>
          </div>
          <div>
            <h3>{t('language')}</h3>
            {langList}
          </div>
        </aside>
      </Overlay>
    </>
  );
}
