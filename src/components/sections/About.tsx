'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Section, Container, SectionTitle, SectionSubtitle, SectionHeader, GradientText, Divider } from '@/components/ui/Section';

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? 0 : '30px')});
  transition: all 0.7s ease;
`;

const ProfilePhotoFrame = styled.div`
  position: relative;
  width: 168px;
  aspect-ratio: 4 / 5;
  float: left;
  shape-outside: margin-box;
  margin: 0.25rem ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm} 0;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.primary}55;
  box-shadow: 0 10px 30px ${({ theme }) => theme.colors.primary}22;

  img {
    object-fit: cover;
    object-position: top center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    float: none;
    margin: 0 auto ${({ theme }) => theme.spacing.md};
    width: 140px;
  }
`;

const AboutParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:last-child {
    margin-bottom: 0;
  }
`;

const AboutRight = styled.div<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateX(${({ $visible }) => ($visible ? 0 : '30px')});
  transition: all 0.7s ease 0.2s;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}66;
    box-shadow: ${({ theme }) => theme.colors.cardShadow};
    transform: translateY(-3px);
  }
`;

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: 800;
  font-family: ${({ theme }) => theme.fonts.mono};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.35rem;
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
`;

const HighlightCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

const HighlightCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}55;
    box-shadow: ${({ theme }) => theme.colors.cardShadow};
    transform: translateY(-2px);
  }
`;

const HighlightIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.skillPillBg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const HighlightContent = styled.div``;

const HighlightTitle = styled.div`
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.2rem;
`;

const HighlightDesc = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
`;

const stats = [
  { number: '5+', labelKey: 'statYears' },
  { number: '20+', labelKey: 'statProjects' },
  { number: '6+', labelKey: 'statCerts' },
  { number: 'Cyber', labelKey: 'statFocus' },
];

const highlights = [
  { icon: '🏫', titleKey: 'highlight1Title', descKey: 'highlight1Desc' },
  { icon: '⛓️', titleKey: 'highlight2Title', descKey: 'highlight2Desc' },
  { icon: '🔐', titleKey: 'highlight3Title', descKey: 'highlight3Desc' },
  { icon: '🛡️', titleKey: 'highlight4Title', descKey: 'highlight4Desc' },
];

export default function About() {
  const t = useTranslations('about');
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();

  return (
    <Section id="about">
      <Container>
        <SectionHeader>
          <SectionTitle>
            <GradientText>{t('title')}</GradientText>
          </SectionTitle>
          <Divider />
          <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
        </SectionHeader>

        <AboutGrid>
          <AboutText $visible={textVisible} ref={textRef as React.RefObject<HTMLDivElement>}>
            <ProfilePhotoFrame>
              <Image
                src="/images/about/profile.png"
                alt="Tales Lima de Paula"
                fill
                sizes="168px"
                priority
              />
            </ProfilePhotoFrame>
            <AboutParagraph>{t('p1')}</AboutParagraph>
            <AboutParagraph>{t('p2')}</AboutParagraph>
            <AboutParagraph>{t('p3')}</AboutParagraph>
          </AboutText>

          <AboutRight $visible={rightVisible} ref={rightRef as React.RefObject<HTMLDivElement>}>
            <StatsGrid>
              {stats.map((stat) => (
                <StatCard key={stat.labelKey}>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{t(stat.labelKey as any)}</StatLabel>
                </StatCard>
              ))}
            </StatsGrid>

            <HighlightCards>
              {highlights.map((h) => (
                <HighlightCard key={h.titleKey}>
                  <HighlightIcon>{h.icon}</HighlightIcon>
                  <HighlightContent>
                    <HighlightTitle>{t(h.titleKey as any)}</HighlightTitle>
                    <HighlightDesc>{t(h.descKey as any)}</HighlightDesc>
                  </HighlightContent>
                </HighlightCard>
              ))}
            </HighlightCards>
          </AboutRight>
        </AboutGrid>
      </Container>
    </Section>
  );
}
