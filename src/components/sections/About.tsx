'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { Wrap, ToneSection, Lines } from '@/components/ui/Layout';
import Timeline from '@/components/ui/Timeline';
import { useInView } from '@/hooks/motion';

const Grid = styled.div`
  display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 3rem clamp(2rem, 7vw, 7rem);
  @media (max-width: ${({ theme }) => theme.bp.md}) { grid-template-columns: 1fr; }
`;

const Left = styled.div`
  h2 { font-size: ${({ theme }) => theme.size.xxl}; margin-bottom: clamp(2rem, 5vw, 4rem); }
`;

const Photo = styled.figure`
  width: min(100%, 22rem); border-radius: 12px; overflow: hidden; background: var(--raised);
  img { width: 100%; height: auto; aspect-ratio: 4 / 5; object-fit: cover; object-position: 50% 28%; filter: grayscale(1) contrast(1.06); transition: filter 0.8s ease; }
  &:hover img { filter: grayscale(0); }
  @media (max-width: ${({ theme }) => theme.bp.md}) { width: min(70%, 16rem); }
`;

const Text = styled.div`
  padding-top: clamp(0rem, 6vw, 6rem);
  p { color: var(--muted); max-width: 38rem; }
  p + p { margin-top: 1.25rem; }
  p:first-child { color: var(--fg); font-family: ${({ theme }) => theme.fonts.display}; font-size: clamp(1.4rem, 2.4vw, 2rem); line-height: 1.3; letter-spacing: -0.02em; }
  dl { display: grid; grid-template-columns: auto 1fr; gap: 0.6rem 2rem; margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--line); max-width: 38rem; }
  dt { color: var(--muted); }
  @media (max-width: ${({ theme }) => theme.bp.sm}) { dl { grid-template-columns: 1fr; gap: 0.1rem; } dd + dt { margin-top: 0.8rem; } }
`;

const TimelineBlock = styled.div`
  margin-top: clamp(5rem, 11vw, 9rem);
  h3 { font-size: ${({ theme }) => theme.size.l}; margin-bottom: 1.5rem; }
`;

export default function About() {
  const t = useTranslations('about');
  const reveal = useInView<HTMLDivElement>(0.2);
  return (
    <ToneSection id="about" data-tone="dark" $overlap aria-labelledby="about-h">
      <Wrap>
        <Grid>
          <Left>
            <Lines id="about-h" text={t('title')} />
            <div ref={reveal}>
              <Photo className="rv-clip">
                <Image src="/images/about/profile.png" alt={t('photoAlt')} width={1254} height={1254} sizes="(max-width: 900px) 16rem, 22rem" />
              </Photo>
            </div>
          </Left>
          <Text>
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <p>{t('p3')}</p>
            <dl>
              <dt>{t('location')}</dt><dd>{t('locationValue')}</dd>
              <dt>{t('languages')}</dt><dd>{t('languagesValue')}</dd>
            </dl>
          </Text>
        </Grid>
        <TimelineBlock>
          <h3 id="timeline-h">{t('timelineTitle')}</h3>
          <Timeline titleId="timeline-h" />
        </TimelineBlock>
      </Wrap>
    </ToneSection>
  );
}
