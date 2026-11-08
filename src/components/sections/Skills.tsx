'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import { skillAreas } from '@/data/skills';
import { Wrap, ToneSection, Lines } from '@/components/ui/Layout';
import type { Locale } from '@/types';

const Head = styled.div`
  display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 1.5rem 4rem; align-items: end;
  margin-bottom: clamp(3rem, 7vw, 5rem);
  h2 { font-size: ${({ theme }) => theme.size.xxl}; }
  p { color: var(--muted); font-size: ${({ theme }) => theme.size.m}; line-height: 1.45; max-width: 28rem; }
  @media (max-width: ${({ theme }) => theme.bp.md}) { grid-template-columns: 1fr; }
`;

// Interactive list: each area opens to show tool → what I do with it → where to check.
const Area = styled.div`
  border-top: 1px solid var(--line);
  &:last-child { border-bottom: 1px solid var(--line); }
  h3 { font-size: inherit; }
  button {
    width: 100%; display: grid; grid-template-columns: minmax(0, 1fr) 3rem; align-items: center; gap: 1.5rem; text-align: left;
    padding-block: clamp(1.4rem, 3vw, 2.25rem);
  }
  .name { font-family: ${({ theme }) => theme.fonts.display}; font-size: clamp(1.6rem, 3.6vw, 3.2rem); letter-spacing: -0.04em; line-height: 1.05; transition: transform 0.6s ${({ theme }) => theme.ease}; }
  .icon { position: relative; width: 3rem; height: 3rem; border-radius: 50%; border: 1px solid var(--line); transition: background-color 0.3s ease, border-color 0.3s ease; }
  .icon::before, .icon::after { content: ''; position: absolute; left: 50%; top: 50%; width: 14px; height: 1.5px; margin: -0.75px 0 0 -7px; background: currentColor; transition: transform 0.45s ${({ theme }) => theme.ease}; }
  .icon::after { transform: rotate(90deg); }
  button[aria-expanded='true'] .icon { background: var(--blue); border-color: var(--blue); color: #fff; }
  button[aria-expanded='true'] .icon::after { transform: rotate(0deg); }
  button:hover .name { transform: translateX(0.75rem); }
`;

const Panel = styled.div<{ $open: boolean }>`
  display: grid; grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.6s ${({ theme }) => theme.ease};
  > div { overflow: hidden; }
  .inner { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 1.5rem clamp(2rem, 5vw, 5rem); padding-bottom: clamp(2rem, 4vw, 3rem); }
  .summary { color: var(--muted); }
  .summary a { color: var(--fg); background: linear-gradient(currentColor, currentColor) no-repeat 0 100% / 100% 1px; transition: background-size 0.4s ease; }
  .summary a:hover { background-size: 0% 1px; background-position: 100% 100%; }
  .summary p + p { margin-top: 1rem; font-size: ${({ theme }) => theme.size.s}; }
  table { width: 100%; border-collapse: collapse; }
  th, td { text-align: left; vertical-align: top; padding-block: 0.9rem; border-top: 1px solid var(--line); }
  tbody tr:first-child th, tbody tr:first-child td { border-top: 0; padding-top: 0; }
  tbody th { font-weight: 600; width: 40%; padding-right: 1.5rem; }
  td { color: var(--muted); }
  @media (max-width: ${({ theme }) => theme.bp.md}) {
    .inner { grid-template-columns: 1fr; }
    tr { display: block; padding-block: 0.8rem; border-top: 1px solid var(--line); }
    tbody tr:first-child { border-top: 0; padding-top: 0; }
    th, td { display: block; width: auto !important; padding: 0; border: 0; }
  }
`;

export default function Skills() {
  const t = useTranslations('skills');
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState<string | null>(skillAreas[0].id);
  return (
    <ToneSection id="skills" data-tone="light" $overlap aria-labelledby="skills-h">
      <Wrap>
        <Head>
          <Lines id="skills-h" text={t('title')} />
          <p>{t('intro')}</p>
        </Head>
        {skillAreas.map((a) => {
          const isOpen = open === a.id;
          return (
            <Area key={a.id}>
              <h3>
                <button type="button" aria-expanded={isOpen} aria-controls={`sk-${a.id}`} id={`sk-${a.id}-b`}
                  onClick={() => setOpen(isOpen ? null : a.id)}>
                  <span className="name">{a.title[locale]}</span>
                  <span className="icon" aria-hidden="true" />
                </button>
              </h3>
              <Panel $open={isOpen} id={`sk-${a.id}`} role="region" aria-labelledby={`sk-${a.id}-b`} inert={!isOpen || undefined}>
                <div>
                  <div className="inner">
                    <div className="summary">
                      <p>{a.summary[locale]}</p>
                      <p>
                        {t('evidence')}{' '}
                        {a.evidence.map((e, i) => (
                          <span key={e.href}>{i > 0 && (locale === 'fr' ? ' et ' : ' and ')}<a href={e.href}>{e.label[locale]}</a></span>
                        ))}
                      </p>
                    </div>
                    <table>
                      <thead className="visually-hidden"><tr><th scope="col">{t('tool')}</th><th scope="col">{t('use')}</th></tr></thead>
                      <tbody>
                        {a.items.map((it, i) => (
                          <tr key={a.id + i}><th scope="row">{typeof it.name === 'string' ? it.name : it.name[locale]}</th><td>{it.use[locale]}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Panel>
            </Area>
          );
        })}
      </Wrap>
    </ToneSection>
  );
}
