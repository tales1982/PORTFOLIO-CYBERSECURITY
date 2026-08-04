'use client';

import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Section, Container, SectionTitle, SectionSubtitle, SectionHeader, GradientText, Divider } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { education } from '@/data/education';

const EduGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    max-width: 560px;
    margin: 0 auto;
  }
`;

const EduCard = styled.div<{ $visible: boolean; $delay: number }>`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? 0 : '40px')});
  transition:
    opacity 0.6s ease ${({ $delay }) => $delay}ms,
    transform 0.6s ease ${({ $delay }) => $delay}ms,
    box-shadow 0.3s ease,
    border-color 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.gradient};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}55;
    box-shadow: ${({ theme }) => theme.colors.cardShadowHover};
    transform: translateY(-6px);
  }
`;

const EduIcon = styled.div`
  font-size: 2.5rem;
`;

const EduHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
`;

const EduMeta = styled.div`
  flex: 1;
`;

const EduInstitution = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
`;

const EduProgram = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const EduInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const EduInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const EduDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  flex: 1;
`;

export default function Education() {
  const t = useTranslations('education');
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Section id="education" $alt>
      <Container>
        <SectionHeader>
          <SectionTitle>
            <GradientText>{t('title')}</GradientText>
          </SectionTitle>
          <Divider />
          <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
        </SectionHeader>

        <EduGrid ref={ref as React.RefObject<HTMLDivElement>}>
          {education.map((edu, index) => (
            <EduCard key={edu.id} $visible={isVisible} $delay={index * 150}>
              <EduIcon>{edu.icon}</EduIcon>

              <EduHeader>
                <EduMeta>
                  <EduInstitution>{edu.institution}</EduInstitution>
                  <EduProgram>{edu.program}</EduProgram>
                </EduMeta>
                <Badge $variant={edu.status === 'completed' ? 'success' : 'info'}>
                  {t(`status.${edu.status}` as any)}
                </Badge>
              </EduHeader>

              <EduInfo>
                <EduInfoRow>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {edu.period}
                </EduInfoRow>
                <EduInfoRow>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {edu.location}
                </EduInfoRow>
              </EduInfo>

              <EduDescription>{edu.description}</EduDescription>
            </EduCard>
          ))}
        </EduGrid>
      </Container>
    </Section>
  );
}
