'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import { softwareProjects } from '@/data/projects';
import { Wrap, ToneSection, Lines, StatusTag, ToolList, ArrowLink } from '@/components/ui/Layout';
import { useInView, useParallax } from '@/hooks/motion';
import type { Locale, SoftwareProject } from '@/types';

const Head = styled.div`
  display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 1.5rem 4rem; align-items: end;
  margin-bottom: clamp(3.5rem, 8vw, 7rem);
  h2 { font-size: ${({ theme }) => theme.size.xxl}; }
  p { color: var(--muted); font-size: ${({ theme }) => theme.size.m}; line-height: 1.45; max-width: 28rem; }
  @media (max-width: ${({ theme }) => theme.bp.md}) { grid-template-columns: 1fr; }
`;

// Different proportions per project so the section reads as a composition, not a grid.
const Board = styled.div`
  display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: clamp(1rem, 2.5vw, 2.5rem); row-gap: clamp(4rem, 9vw, 8rem);
  .p-zaori { grid-column: 1 / -1; display: grid; grid-template-columns: subgrid; align-items: end; }
  .p-zaori .shot { grid-column: 1 / 9; } .p-zaori .body { grid-column: 9 / 13; }
  .p-tech-news-explained { grid-column: 1 / 7; }
  .p-cyberacademy { grid-column: 8 / 13; margin-top: clamp(4rem, 12vw, 12rem); }
  .p-brsolutions { grid-column: 3 / 8; }
  @media (max-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 1fr;
    .p-zaori, .p-zaori .shot, .p-zaori .body, .p-tech-news-explained, .p-cyberacademy, .p-brsolutions { grid-column: 1 / -1; margin-top: 0; }
    .p-zaori { display: block; }
  }
`;

const Shot = styled.a`
  display: block; border-radius: 12px; overflow: hidden; background: var(--paper-2);
  img { width: 100%; height: auto; aspect-ratio: 1200 / 712; object-fit: cover; object-position: top; transition: transform 0.9s ${({ theme }) => theme.ease}; }
  &:hover img, &:focus-visible img { transform: scale(1.035); }
`;

const Body = styled.div`
  display: grid; gap: 0.9rem; justify-items: start; margin-top: 1.5rem;
  h3 { font-size: ${({ theme }) => theme.size.l}; }
  .kind { color: var(--muted); margin-top: -0.5rem; }
  .role { padding-left: 1rem; border-left: 2px solid var(--accent); }
  .role b { display: block; font-weight: 600; font-size: ${({ theme }) => theme.size.s}; }
`;

function Project({ p, locale, speed }: { p: SoftwareProject; locale: Locale; speed: number }) {
  const t = useTranslations('software');
  const reveal = useInView<HTMLDivElement>(0.15);
  const drift = useParallax<HTMLDivElement>(speed);
  return (
    <article className={`p-${p.id}`} aria-labelledby={`sw-${p.id}-h`} id={`sw-${p.id}`}>
      <div className="shot">
        <div ref={drift}>
          <div ref={reveal}><div className="rv-clip">
            <Shot href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
              <Image src={p.image} alt={t('imageAlt', { name: p.name })} width={1200} height={800}
                sizes={p.id === 'zaori' ? '(max-width: 900px) 100vw, 65vw' : '(max-width: 900px) 100vw, 45vw'} />
            </Shot>
          </div></div>
        </div>
      </div>
      <Body className="body">
        <StatusTag status="live" />
        <h3 id={`sw-${p.id}-h`}>{p.name}</h3>
        <p className="kind">{p.kind[locale]}</p>
        <p>{p.description[locale]}</p>
        {p.role && <p className="role"><b>{t('role')}</b>{p.role[locale]}</p>}
        <ToolList>{p.tools.map((x) => <li key={x}>{x}</li>)}</ToolList>
        <ArrowLink href={p.url} external>{t('visit', { name: p.url.replace(/^https?:\/\//, '') })}</ArrowLink>
      </Body>
    </article>
  );
}

export default function Software() {
  const t = useTranslations('software');
  const locale = useLocale() as Locale;
  const speeds: Record<string, number> = { zaori: 0, 'tech-news-explained': 0.03, cyberacademy: 0.09, brsolutions: 0.02 };
  return (
    <ToneSection id="software" data-tone="light" $overlap aria-labelledby="software-h">
      <Wrap>
        <Head>
          <Lines id="software-h" text={t('title')} />
          <p>{t('intro')}</p>
        </Head>
        <Board>
          {softwareProjects.map((p) => <Project key={p.id} p={p} locale={locale} speed={speeds[p.id] ?? 0} />)}
        </Board>
      </Wrap>
    </ToneSection>
  );
}
