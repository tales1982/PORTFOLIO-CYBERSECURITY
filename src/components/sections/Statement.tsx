'use client';

import styled, { keyframes } from 'styled-components';
import { useTranslations } from 'next-intl';
import { Wrap, ToneSection, Lines } from '@/components/ui/Layout';
import { useParallax } from '@/hooks/motion';

const Top = styled.div`
  display: grid; grid-template-columns: minmax(0, 8fr) minmax(0, 4fr); gap: 2.5rem clamp(2rem, 5vw, 5rem); align-items: end;
  @media (max-width: ${({ theme }) => theme.bp.lg}) { grid-template-columns: 1fr; }
`;

const Big = styled(Lines)`
  font-size: clamp(2rem, 4.6vw, 4.4rem); line-height: 1.05; letter-spacing: -0.04em;
`;

const Body = styled.p`color: var(--muted); max-width: 26rem;`;

const travel = keyframes`
  0% { left: 0; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { left: 100%; opacity: 0; }
`;

// The same Develop → Detect → Respond sequence as the hero network, laid flat.
const Steps = styled.ol`
  position: relative; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem clamp(1.5rem, 4vw, 4rem);
  margin-top: clamp(5rem, 11vw, 9rem); padding-top: 2.5rem;
  &::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 1px; background: var(--fg); }
  .pulse { position: absolute; top: -3px; width: 7px; height: 7px; border-radius: 50%; background: var(--blue); box-shadow: -18px 0 14px -4px rgba(46, 75, 255, 0.5); animation: ${travel} 5.5s cubic-bezier(0.45, 0, 0.55, 1) infinite; }
  @media (max-width: ${({ theme }) => theme.bp.md}) { grid-template-columns: 1fr; }
  @media (prefers-reduced-motion: reduce) { .pulse { display: none; } }
`;

const Step = styled.li`
  position: relative;
  &::before { content: ''; position: absolute; top: calc(-2.5rem - 4px); left: 0; width: 9px; height: 9px; border-radius: 50%; background: var(--bg); border: 1.5px solid var(--fg); }
  h3 { font-size: clamp(2.25rem, 4.5vw, 4rem); margin-bottom: 1rem; }
  p { color: var(--muted); max-width: 22rem; }
  @media (max-width: ${({ theme }) => theme.bp.md}) { &::before { display: none; } }
`;

function ParallaxStep({ speed, title, text }: { speed: number; title: string; text: string }) {
  const ref = useParallax<HTMLDivElement>(speed);
  return (
    <Step>
      <div ref={ref}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </Step>
  );
}

export default function Statement() {
  const t = useTranslations('statement');
  return (
    <ToneSection data-tone="light" $overlap aria-labelledby="statement-h">
      <Wrap>
        <Top>
          <Big id="statement-h" text={t('text')} />
          <Body>{t('body')}</Body>
        </Top>
        <Steps aria-label={t('stepsLabel')}>
          <span className="pulse" aria-hidden="true" />
          <ParallaxStep speed={0.02} title={t('develop')} text={t('developText')} />
          <ParallaxStep speed={0.06} title={t('detect')} text={t('detectText')} />
          <ParallaxStep speed={0.1} title={t('respond')} text={t('respondText')} />
        </Steps>
      </Wrap>
    </ToneSection>
  );
}
