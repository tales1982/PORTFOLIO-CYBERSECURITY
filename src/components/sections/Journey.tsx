'use client';

import React from 'react';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Section, Container, SectionTitle, SectionSubtitle, SectionHeader, GradientText, Divider } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';

const TimelineWrapper = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`;

const TimelineConnector = styled.div`
  position: relative;
  height: 2.5rem;

  &::before {
    content: '';
    position: absolute;
    left: 27px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.primary}55,
      ${({ theme }) => theme.colors.accent}99,
      ${({ theme }) => theme.colors.primary}55
    );
    border-radius: 2px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    &::before {
      left: calc(50% - 1px);
    }
  }
`;

const TimelineItem = styled.div<{ $visible: boolean; $delay: number }>`
  display: flex;
  gap: 2rem;
  padding-left: 72px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? 0 : '30px')});
  transition:
    opacity 0.6s ease ${({ $delay }) => $delay}ms,
    transform 0.6s ease ${({ $delay }) => $delay}ms;
`;

const TimelineDot = styled.div<{ $isFuture?: boolean }>`
  position: absolute;
  left: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ $isFuture, theme }) =>
    $isFuture
      ? theme.colors.backgroundAlt
      : `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`};
  border: 3px solid ${({ $isFuture, theme }) =>
    $isFuture ? theme.colors.border : theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  box-shadow: 0 0 0 4px ${({ $isFuture, theme }) =>
    $isFuture ? `${theme.colors.border}44` : `${theme.colors.timelineDot}33`};
  z-index: 1;
  margin-top: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    left: calc(50% - 16px);
  }
`;

const TimelineContent = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  position: relative;
  transition: all ${({ theme }) => theme.transitions.normal};

  &::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 20px;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid ${({ theme }) => theme.colors.border};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}55;
    box-shadow: ${({ theme }) => theme.colors.cardShadowHover};
    transform: translateX(4px);
  }
`;

const TimelineYear = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
`;

const TimelineTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.625rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const TimelineDesc = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;

const steps = [
  { key: 'step1', icon: '🏫', isFuture: false },
  { key: 'step2', icon: '⛓️', isFuture: false },
  { key: 'step3', icon: '🔄', isFuture: false },
  { key: 'step4', icon: '🎓', isFuture: false },
  { key: 'step5', icon: '🚀', isFuture: true },
];

export default function Journey() {
  const t = useTranslations('journey');
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Section id="journey" $alt>
      <Container>
        <SectionHeader $centered>
          <SectionTitle>
            <GradientText>{t('title')}</GradientText>
          </SectionTitle>
          <Divider style={{ margin: '1rem auto 1.5rem' }} />
          <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
        </SectionHeader>

        <TimelineWrapper ref={ref as React.RefObject<HTMLDivElement>}>
          {steps.map((step, index) => (
            <React.Fragment key={step.key}>
              <div style={{ position: 'relative' }}>
                <TimelineDot $isFuture={step.isFuture}>
                  {step.icon}
                </TimelineDot>
                <TimelineItem $visible={isVisible} $delay={index * 150}>
                  <TimelineContent>
                    <TimelineYear>{t(`${step.key}Year` as any)}</TimelineYear>
                    <TimelineTitle>
                      {t(`${step.key}Title` as any)}
                      {step.isFuture && (
                        <Badge $variant="info">{t('goal')}</Badge>
                      )}
                      {step.key === 'step4' && (
                        <Badge $variant="success">{t('current')}</Badge>
                      )}
                    </TimelineTitle>
                    <TimelineDesc>{t(`${step.key}Desc` as any)}</TimelineDesc>
                  </TimelineContent>
                </TimelineItem>
              </div>
              {index < steps.length - 1 && <TimelineConnector />}
            </React.Fragment>
          ))}
        </TimelineWrapper>
      </Container>
    </Section>
  );
}
