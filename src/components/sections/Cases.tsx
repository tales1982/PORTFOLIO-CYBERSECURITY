'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import { securityCases } from '@/data/projects';
import { Wrap, ToneSection, Lines, StatusTag, ToolList, ArrowLink } from '@/components/ui/Layout';
import Diagram from '@/components/ui/Diagram';
import { useInView } from '@/hooks/motion';
import type { Locale, SecurityCase } from '@/types';

const Title = styled(Lines)`font-size: ${({ theme }) => theme.size.xxl}; margin-bottom: clamp(4rem, 9vw, 7rem);`;

const Case = styled.article`
  padding-block: clamp(3.5rem, 8vw, 6.5rem);
  border-top: 1px solid var(--line);
`;

const CaseHead = styled.header`
  display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 1.5rem clamp(2rem, 6vw, 6rem); align-items: end;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
  h3 { font-size: ${({ theme }) => theme.size.xl}; margin-top: 1.25rem; }
  .context { color: var(--muted); font-size: ${({ theme }) => theme.size.m}; line-height: 1.45; }
  @media (max-width: ${({ theme }) => theme.bp.md}) { grid-template-columns: 1fr; }
`;

const Split = styled.div<{ $flip?: boolean }>`
  display: grid; grid-template-columns: ${({ $flip }) => ($flip ? 'minmax(0, 4fr) minmax(0, 8fr)' : 'minmax(0, 8fr) minmax(0, 4fr)')};
  gap: 2.5rem clamp(2rem, 5vw, 5rem); align-items: start;
  @media (max-width: ${({ theme }) => theme.bp.md}) { grid-template-columns: 1fr; }
`;

// Real screenshot inside a mask that opens when it scrolls into view.
const Shot = styled.figure`
  border-radius: 12px; overflow: hidden; background: var(--raised);
  img { width: 100%; height: auto; aspect-ratio: 1200 / 712; object-fit: cover; object-position: top; }
  figcaption { padding: 0.9rem 1.1rem; font-size: ${({ theme }) => theme.size.s}; color: var(--muted); background: var(--raised); position: relative; }
`;

const Spec = styled.dl`
  display: grid; gap: 1.75rem;
  dt { font-size: ${({ theme }) => theme.size.s}; color: var(--muted); margin-bottom: 0.4rem; }
  dd { line-height: 1.6; }
`;

const Links = styled.ul`display: grid; gap: 0.5rem; margin-top: 0.5rem;`;

const Columns = styled.div`
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem clamp(2rem, 4vw, 4rem); margin-top: clamp(2.5rem, 5vw, 4rem);
  h4 { font-family: ${({ theme }) => theme.fonts.body}; font-size: ${({ theme }) => theme.size.s}; letter-spacing: 0; font-weight: 500; color: var(--muted); margin-bottom: 0.6rem; }
  @media (max-width: ${({ theme }) => theme.bp.md}) { grid-template-columns: 1fr; }
`;

const DiagramWrap = styled.div`
  padding: clamp(1.5rem, 4vw, 3.5rem); border-radius: 12px; background: var(--raised);
  margin-top: clamp(2rem, 5vw, 3.5rem);
`;

// A real sequence: built, in progress, next. The bar fills to where the work is.
const Phases = styled.ol`
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem clamp(2rem, 5vw, 5rem);
  position: relative; padding-top: 2rem;
  &::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--line); }
  &::after { content: ''; position: absolute; top: 0; left: 0; width: 50%; height: 2px; background: var(--accent); transform-origin: left; transition: transform 1.4s ${({ theme }) => theme.ease} 0.3s; }
  &[data-armed='true']:not([data-in='true'])::after { transform: scaleX(0); }
  li { position: relative; }
  li::before { content: ''; position: absolute; top: calc(-2rem - 6px); left: 0; width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--fg); background: var(--bg); }
  li[data-state='done']::before { background: var(--fg); }
  li[data-state='progress']::before { border-color: var(--accent); background: linear-gradient(90deg, var(--accent) 50%, var(--bg) 50%); }
  li[data-state='next'] { color: var(--muted); }
  li[data-state='next']::before { border-style: dashed; border-color: var(--muted); }
  strong { display: block; font-size: ${({ theme }) => theme.size.s}; font-weight: 500; color: var(--muted); margin-bottom: 0.5rem; }
  li[data-state='progress'] strong { color: var(--accent); }
  p { font-size: clamp(1.25rem, 2vw, 1.6rem); line-height: 1.3; font-family: ${({ theme }) => theme.fonts.display}; letter-spacing: -0.015em; max-width: 22rem; }
  @media (max-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 1fr; padding-top: 0; padding-left: 2rem;
    &::before { top: 0; bottom: 0; left: 6px; right: auto; width: 2px; height: auto; }
    &::after { top: 0; left: 6px; width: 2px; height: 45%; transform-origin: top; }
    &[data-armed='true']:not([data-in='true'])::after { transform: scaleY(0); }
    li::before { top: 0.3rem; left: calc(-2rem); }
  }
`;

const Note = styled.p`
  margin-top: 2rem; padding: 1.1rem 1.4rem; border-radius: 10px; border: 1px dashed var(--line); color: var(--muted); max-width: 44rem;
`;

const Compact = styled.div`
  display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 1.5rem clamp(2rem, 6vw, 6rem);
  h3 { font-size: ${({ theme }) => theme.size.xl}; margin-top: 1.25rem; }
  p { color: var(--muted); margin-bottom: 1.25rem; font-size: ${({ theme }) => theme.size.m}; line-height: 1.45; }
  @media (max-width: ${({ theme }) => theme.bp.md}) { grid-template-columns: 1fr; }
`;

function Head({ c, locale }: { c: SecurityCase; locale: Locale }) {
  return (
    <CaseHead>
      <div>
        <StatusTag status={c.status} />
        <Lines tag="h3" id={`case-${c.id}-h`} text={c.title[locale]} />
      </div>
      <p className="context">{c.context[locale]}</p>
    </CaseHead>
  );
}

function Tools({ c }: { c: SecurityCase }) {
  return <ToolList>{c.tools.map((x) => <li key={x}>{x}</li>)}</ToolList>;
}

function CaseLinks({ c, locale }: { c: SecurityCase; locale: Locale }) {
  if (!c.links.length) return null;
  return <Links>{c.links.map((l) => <li key={l.href}><ArrowLink href={l.href} external>{l.label[locale]}</ArrowLink></li>)}</Links>;
}

function ScreenshotCase({ c, locale }: { c: SecurityCase; locale: Locale }) {
  const t = useTranslations('cases');
  const reveal = useInView<HTMLDivElement>(0.2);
  return (
    <>
      <Split>
        <div ref={reveal}>
          <Shot className="rv-clip">
            <Image src={c.image!} alt={t('imageAlt')} width={1200} height={800} sizes="(max-width: 900px) 100vw, 60vw" />
            <figcaption>{t('imageCaption')}</figcaption>
          </Shot>
        </div>
        <div>
          <Spec>
            <div><dt>{t('built')}</dt><dd>{c.built?.[locale]}</dd></div>
            <div><dt>{t('learned')}</dt><dd>{c.learned?.[locale]}</dd></div>
            <div><dt>{t('tools')}</dt><dd><Tools c={c} /></dd></div>
          </Spec>
          <div style={{ marginTop: '1.75rem' }}><CaseLinks c={c} locale={locale} /></div>
        </div>
      </Split>
      {c.diagram && <DiagramWrap><Diagram id={c.diagram} /></DiagramWrap>}
    </>
  );
}

function DiagramCase({ c, locale }: { c: SecurityCase; locale: Locale }) {
  const t = useTranslations('cases');
  return (
    <>
      {c.diagram && <DiagramWrap style={{ marginTop: 0 }}><Diagram id={c.diagram} /></DiagramWrap>}
      <Columns>
        <div><h4>{t('built')}</h4><p>{c.built?.[locale]}</p></div>
        <div><h4>{t('learned')}</h4><p>{c.learned?.[locale]}</p></div>
        <div><h4>{t('tools')}</h4><Tools c={c} /><CaseLinks c={c} locale={locale} /></div>
      </Columns>
    </>
  );
}

function PhaseCase({ c, locale }: { c: SecurityCase; locale: Locale }) {
  const t = useTranslations('cases');
  const ref = useInView<HTMLOListElement>(0.3);
  return (
    <>
      <Phases ref={ref} aria-label={t('phasesTitle')}>
        {c.phases!.map((p) => (
          <li key={p.state} data-state={p.state}><strong>{t(p.state)}</strong><p>{p.text[locale]}</p></li>
        ))}
      </Phases>
      <Split $flip style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
        <div>
          {c.note && <Note style={{ marginTop: 0 }}>{c.note[locale]}</Note>}
          <div style={{ marginTop: '1.5rem' }}><Tools c={c} /></div>
        </div>
        {c.diagram && <DiagramWrap style={{ marginTop: 0 }}><Diagram id={c.diagram} legend /></DiagramWrap>}
      </Split>
    </>
  );
}

export default function Cases() {
  const t = useTranslations('cases');
  const locale = useLocale() as Locale;
  return (
    <ToneSection data-tone="dark" $overlap aria-labelledby="cases-h">
      <Wrap>
        <Title id="cases-h" text={t('title')} />
        {securityCases.map((c) => (
          <Case key={c.id} id={`case-${c.id}`} aria-labelledby={`case-${c.id}-h`}>
            {c.compact ? (
              <Compact>
                <div>
                  <StatusTag status={c.status} />
                  <Lines tag="h3" id={`case-${c.id}-h`} text={c.title[locale]} />
                </div>
                <div><p>{c.context[locale]}</p><Tools c={c} /><CaseLinks c={c} locale={locale} /></div>
              </Compact>
            ) : (
              <>
                <Head c={c} locale={locale} />
                {c.phases ? <PhaseCase c={c} locale={locale} /> : c.image ? <ScreenshotCase c={c} locale={locale} /> : <DiagramCase c={c} locale={locale} />}
              </>
            )}
          </Case>
        ))}
      </Wrap>
    </ToneSection>
  );
}
