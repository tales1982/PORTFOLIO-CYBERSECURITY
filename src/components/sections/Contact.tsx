'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import { Wrap, ToneSection, Lines, Magnetic, PillPrimary, PillGhost, ArrowLink } from '@/components/ui/Layout';
import { CV_FILES, EMAIL, FORMSPREE_ENDPOINT, LINKS } from '@/data/contact';

const Title = styled(Lines)`font-size: ${({ theme }) => theme.size.xxl};`;

const Intro = styled.p`color: var(--muted); font-size: ${({ theme }) => theme.size.m}; max-width: 32rem; margin-block: 2rem 3rem;`;

// The email is the main call to action, set large, with a copy button beside it.
const MailRow = styled.div`
  display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem 2rem;
  padding-block: clamp(2rem, 4vw, 3rem); border-block: 1px solid var(--line);
`;

const Mail = styled.a`
  font-family: ${({ theme }) => theme.fonts.display}; font-size: clamp(1.5rem, 5vw, 4.5rem); letter-spacing: -0.04em; line-height: 1;
  overflow-wrap: anywhere;
  background: linear-gradient(var(--blue-light), var(--blue-light)) no-repeat 0 100% / 0% 2px; padding-bottom: 0.12em;
  transition: background-size 0.6s ${({ theme }) => theme.ease};
  &:hover, &:focus-visible { background-size: 100% 2px; }
`;

const CopyBtn = styled(PillGhost).attrs({ as: 'button' })`
  &[data-state='done'] { border-color: var(--blue-light); }
`;

const Grid = styled.div`
  display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 7fr); gap: 3rem clamp(2rem, 6vw, 6rem); margin-top: clamp(3rem, 7vw, 5rem);
  @media (max-width: ${({ theme }) => theme.bp.md}) { grid-template-columns: 1fr; }
`;

const Elsewhere = styled.div`
  h3 { font-family: ${({ theme }) => theme.fonts.body}; font-size: ${({ theme }) => theme.size.s}; letter-spacing: 0; font-weight: 500; color: var(--muted); margin-bottom: 1rem; }
  ul { display: grid; gap: 0.75rem; }
`;

const Form = styled.form`
  display: grid; gap: 1.5rem;
  h3 { font-family: ${({ theme }) => theme.fonts.body}; font-size: ${({ theme }) => theme.size.s}; letter-spacing: 0; font-weight: 500; color: var(--muted); }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  @media (max-width: ${({ theme }) => theme.bp.sm}) { .row { grid-template-columns: 1fr; } }
  label { display: grid; gap: 0.25rem; font-size: ${({ theme }) => theme.size.s}; color: var(--muted); }
  input, textarea {
    width: 100%; padding: 0.7rem 0; background: transparent; border: 0; border-bottom: 1px solid var(--line);
    font-size: ${({ theme }) => theme.size.m}; color: var(--fg); border-radius: 0; transition: border-color 0.3s ease;
  }
  input:focus-visible, textarea:focus-visible { outline: none; border-bottom-color: var(--blue-light); box-shadow: 0 1px 0 0 var(--blue-light); }
  textarea { min-height: 7rem; resize: vertical; }
  button[disabled] { opacity: 0.6; cursor: wait; }
`;

const Msg = styled.p<{ $ok: boolean }>`
  padding: 0.9rem 1.1rem; border-radius: 8px; border: 1px solid ${({ $ok }) => ($ok ? 'var(--blue-light)' : 'var(--line)')};
`;

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copy, setCopy] = useState<'idle' | 'done' | 'fail'>('idle');

  // Clipboard API first; if it is missing, refused or never answers, fall back
  // to a temporary textarea so the visitor always gets feedback.
  const onCopy = async () => {
    const fallback = () => {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch { ok = false; }
      ta.remove();
      return ok;
    };
    let ok = false;
    try {
      if (!navigator.clipboard) throw new Error('no clipboard');
      await Promise.race([
        navigator.clipboard.writeText(EMAIL),
        new Promise((_, reject) => window.setTimeout(() => reject(new Error('timeout')), 800)),
      ]);
      ok = true;
    } catch {
      ok = fallback();
    }
    setCopy(ok ? 'done' : 'fail');
    window.setTimeout(() => setCopy('idle'), 2400);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (res.ok) { setStatus('success'); form.reset(); } else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <ToneSection id="contact" data-tone="dark" $overlap aria-labelledby="contact-h">
      <Wrap>
        <Title id="contact-h" text={t('title')} />
        <Intro>{t('intro')}</Intro>
        <MailRow>
          <Mail href={`mailto:${EMAIL}`}>{EMAIL}</Mail>
          <Magnetic>
            <CopyBtn type="button" onClick={onCopy} data-state={copy}>
              <span data-magnetic-label>{copy === 'done' ? t('copied') : t('copy')}</span>
            </CopyBtn>
          </Magnetic>
          <span className="visually-hidden" aria-live="polite">{copy === 'done' ? t('copied') : copy === 'fail' ? t('copyFailed') : ''}</span>
          {copy === 'fail' && <span aria-hidden="true" style={{ color: 'var(--muted)' }}>{t('copyFailed')}</span>}
        </MailRow>
        <Grid>
          <Elsewhere>
            <h3>{t('elsewhere')}</h3>
            <ul>
              <li><ArrowLink href={LINKS.linkedin} external>{t('linkedin')}</ArrowLink></li>
              <li><ArrowLink href={LINKS.github} external>{t('github')}</ArrowLink></li>
              <li><ArrowLink href={CV_FILES.en} dir="s" download>{t('cvEn')}</ArrowLink></li>
              <li><ArrowLink href={CV_FILES.fr} dir="s" download>{t('cvFr')}</ArrowLink></li>
            </ul>
          </Elsewhere>
          <Form onSubmit={onSubmit} aria-labelledby="form-h" lang={locale}>
            <h3 id="form-h">{t('formTitle')}</h3>
            <div className="row">
              <label>{t('name')}<input name="name" autoComplete="name" required /></label>
              <label>{t('emailField')}<input type="email" name="email" autoComplete="email" required /></label>
            </div>
            <label>{t('message')}<textarea name="message" required /></label>
            <div aria-live="polite">
              {status === 'success' && <Msg $ok role="status">{t('success')}</Msg>}
              {status === 'error' && <Msg $ok={false} role="alert">{t('error')}</Msg>}
            </div>
            <div>
              <Magnetic>
                <PillPrimary as="button" type="submit" disabled={status === 'sending'}>
                  <span data-magnetic-label>{status === 'sending' ? t('sending') : t('send')}</span>
                </PillPrimary>
              </Magnetic>
            </div>
          </Form>
        </Grid>
      </Wrap>
    </ToneSection>
  );
}
