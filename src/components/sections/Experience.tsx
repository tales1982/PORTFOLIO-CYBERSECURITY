'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import { experience } from '@/data/experience';
import { certifications } from '@/data/certifications';
import { Wrap, ToneSection, Lines } from '@/components/ui/Layout';
import type { Locale } from '@/types';

const Title = styled(Lines)`font-size: ${({ theme }) => theme.size.xxl}; margin-bottom: clamp(3rem, 7vw, 5rem);`;

const Columns = styled.div`
  display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 3rem clamp(2rem, 6vw, 6rem);
  @media (max-width: ${({ theme }) => theme.bp.md}) { grid-template-columns: 1fr; }
`;

const GroupTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.body}; font-size: ${({ theme }) => theme.size.s}; letter-spacing: 0; font-weight: 500; color: var(--muted);
  padding-bottom: 1rem; border-bottom: 1px solid var(--fg);
`;

const Entry = styled.li`
  position: relative; padding-block: 1.6rem; border-bottom: 1px solid var(--line);
  .when { display: flex; justify-content: space-between; gap: 1rem; font-size: ${({ theme }) => theme.size.s}; color: var(--muted); margin-bottom: 0.5rem; }
  .when b { font-weight: 500; color: var(--fg); display: inline-flex; align-items: center; gap: 0.4rem; }
  .when b::before { content: ''; width: 0.5rem; height: 0.5rem; border-radius: 50%; border: 1.5px solid currentColor; }
  .when b.on { color: var(--accent); }
  .when b.on::before { background: linear-gradient(90deg, currentColor 50%, transparent 50%); }
  .when b.off::before { background: currentColor; }
  h4 { font-size: clamp(1.35rem, 2.2vw, 1.75rem); letter-spacing: -0.025em; line-height: 1.15; }
  .org { margin: 0.35rem 0 0.6rem; }
  .org span { color: var(--muted); }
  p:last-child { color: var(--muted); max-width: 40rem; }
`;

const Certs = styled.section`
  margin-top: clamp(4rem, 9vw, 7rem);
  ul { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: clamp(2rem, 6vw, 6rem); }
  li { border-bottom: 1px solid var(--line); }
  a { display: grid; grid-template-columns: 5.5rem minmax(0, 1fr) 1.25rem; gap: 1.25rem; align-items: center; padding-block: 1.25rem; }
  img { width: 5.5rem; height: auto; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 4px; background: #fff; transition: transform 0.5s ${({ theme }) => theme.ease}; }
  h4 { font-family: ${({ theme }) => theme.fonts.body}; font-size: 1rem; font-weight: 600; letter-spacing: 0; line-height: 1.35; }
  p { font-size: ${({ theme }) => theme.size.s}; color: var(--muted); margin-top: 0.2rem; }
  svg { width: 0.9rem; height: 0.9rem; transition: transform 0.4s ${({ theme }) => theme.ease}; }
  a:hover img, a:focus-visible img { transform: rotate(-3deg) scale(1.06); }
  a:hover svg, a:focus-visible svg { transform: translate(3px, -3px); }
  @media (max-width: ${({ theme }) => theme.bp.md}) { ul { grid-template-columns: 1fr; } }
`;

export default function Experience() {
  const t = useTranslations('experience');
  const tc = useTranslations('common');
  const locale = useLocale() as Locale;
  const month = (ym: string) =>
    new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${ym}-15T12:00:00Z`));
  const certs = [...certifications].sort((a, b) => (a.issueDate < b.issueDate ? 1 : -1));

  const list = (kind: 'work' | 'study') => (
    <ul>
      {experience.filter((e) => e.kind === kind).map((e) => (
        <Entry key={e.id}>
          <p className="when">
            <span>{e.period[locale]}</span>
            <b className={e.ongoing ? 'on' : 'off'}>{e.ongoing ? t('ongoing') : t('done')}</b>
          </p>
          <h4>{e.title[locale]}</h4>
          <p className="org">{typeof e.org === 'string' ? e.org : e.org[locale]}, <span>{e.place[locale]}</span></p>
          <p>{e.description[locale]}</p>
        </Entry>
      ))}
    </ul>
  );

  return (
    <ToneSection id="experience" data-tone="light" aria-labelledby="experience-h" style={{ paddingTop: 0 }}>
      <Wrap>
        <Title id="experience-h" text={t('title')} />
        <Columns>
          <section aria-labelledby="work-exp-h"><GroupTitle id="work-exp-h">{t('work')}</GroupTitle>{list('work')}</section>
          <section aria-labelledby="study-h"><GroupTitle id="study-h">{t('study')}</GroupTitle>{list('study')}</section>
        </Columns>
        <Certs aria-labelledby="certs-h">
          <GroupTitle id="certs-h">{t('certsTitle')}</GroupTitle>
          <ul>
            {certs.map((c) => (
              <li key={c.id}>
                <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer">
                  <Image src={c.image} alt="" width={176} height={132} sizes="88px" />
                  <div>
                    <h4>{c.name}</h4>
                    <p>
                      {c.issuer}. {t('issued', { date: month(c.issueDate) })}
                      {c.expirationDate && `, ${t('expires', { date: month(c.expirationDate) })}`}.
                    </p>
                    <span className="visually-hidden">{t('view')} {tc('newTab')}</span>
                  </div>
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M2 10 10 2M4 2h6v6" /></svg>
                </a>
              </li>
            ))}
          </ul>
        </Certs>
      </Wrap>
    </ToneSection>
  );
}
