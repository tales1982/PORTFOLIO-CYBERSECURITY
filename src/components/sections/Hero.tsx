'use client';

import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import EventNetwork from '@/components/hero/EventNetwork';
import { Lines, Magnetic, PillPrimary, PillGhost, ArrowLink } from '@/components/ui/Layout';
import { CV_FILES } from '@/data/contact';

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;

const Root = styled.section`
  position: relative; min-height: 100svh; overflow: hidden;
  background: var(--bg); color: var(--fg);
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 7rem ${({ theme }) => theme.gutter} calc(${({ theme }) => theme.radius} + clamp(1.5rem, 4vh, 3rem));
  @media (max-width: ${({ theme }) => theme.bp.md}) { padding-top: 46svh; }
`;

const Content = styled.div`
  position: relative; z-index: 1; width: 100%; max-width: ${({ theme }) => theme.wrap}; margin-inline: auto;
  pointer-events: none;
  a, button { pointer-events: auto; }
`;

const Status = styled.p`
  display: inline-flex; align-items: center; gap: 0.7rem; margin-bottom: clamp(1rem, 3vh, 2rem);
  color: var(--muted); animation: ${fadeIn} 1s ease 0.2s both;
  &::before { content: ''; width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--blue-light); box-shadow: 0 0 0 4px rgba(46, 75, 255, 0.3); flex: none; }
`;

const Name = styled(Lines)`
  font-size: ${({ theme }) => theme.size.hero};
  line-height: 0.88; letter-spacing: -0.055em; font-weight: 400;
  margin-left: -0.05em;
  @media (max-width: ${({ theme }) => theme.bp.md}) { font-size: clamp(3.4rem, 16vw, 7rem); }
`;

const Bottom = styled.div`
  display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 2rem clamp(2rem, 6vw, 6rem);
  align-items: end; margin-top: clamp(1.75rem, 5vh, 3rem);
  animation: ${fadeIn} 1s ease 0.7s both;
  @media (max-width: ${({ theme }) => theme.bp.md}) { grid-template-columns: 1fr; }
`;

const Lede = styled.p`font-size: ${({ theme }) => theme.size.m}; line-height: 1.4; max-width: 30rem;`;

const Actions = styled.div`
  display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.25rem; justify-content: flex-end;
  @media (max-width: ${({ theme }) => theme.bp.md}) { justify-content: flex-start; }
`;

const Hint = styled.p`
  position: absolute; z-index: 1; right: ${({ theme }) => theme.gutter}; top: 6rem; max-width: 15rem; text-align: right;
  font-size: 0.8rem; color: var(--muted); animation: ${fadeIn} 1s ease 1.6s both;
  .touch { display: none; }
  @media (hover: none) { .mouse { display: none; } .touch { display: inline; } }
  @media (max-width: ${({ theme }) => theme.bp.md}) { top: calc(44svh - 1.5rem); right: auto; left: ${({ theme }) => theme.gutter}; text-align: left; max-width: none; }
`;

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const progress = useRef(0);
  const rootRef = useRef<HTMLElement>(null);

  // Scroll progress through the hero drives the network's reorganization.
  useEffect(() => {
    const onScroll = () => {
      const h = rootRef.current?.offsetHeight ?? window.innerHeight;
      progress.current = window.scrollY / (h * 0.85);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Root ref={rootRef} id="top" data-tone="dark" aria-labelledby="hero-name">
      <EventNetwork progressRef={progress} />
      <Hint><span className="mouse">{t('hint')}</span><span className="touch">{t('touchHint')}</span></Hint>
      <Content>
        <Status>{t('status')}</Status>
        <Name tag="h1" id="hero-name" text={t('name')} onLoad delay={0.1} />
        <Bottom>
          <Lede>{t('lede')}</Lede>
          <Actions>
            <Magnetic><PillPrimary href="#work"><span data-magnetic-label>{t('ctaWork')}</span></PillPrimary></Magnetic>
            <Magnetic><PillGhost href="#contact"><span data-magnetic-label>{t('ctaContact')}</span></PillGhost></Magnetic>
            <ArrowLink href={CV_FILES[locale] ?? CV_FILES.en} dir="s" download>{t('cv')}</ArrowLink>
          </Actions>
        </Bottom>
      </Content>
    </Root>
  );
}
