'use client';

import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Section, Container, SectionTitle, SectionSubtitle, SectionHeader, GradientText, Divider } from '@/components/ui/Section';
import { skillCategories } from '@/data/skills';

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const SkillCard = styled.div<{ $visible: boolean; $delay: number }>`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? 0 : '30px')});
  transition:
    opacity 0.6s ease ${({ $delay }) => $delay}ms,
    transform 0.6s ease ${({ $delay }) => $delay}ms,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}44;
    box-shadow: ${({ theme }) => theme.colors.cardShadowHover};
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CategoryIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.skillPillBg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const CategoryName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const SkillPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.875rem;
  background: ${({ theme }) => theme.colors.skillPillBg};
  color: ${({ theme }) => theme.colors.skillPillText};
  border: 1px solid ${({ theme }) => theme.colors.skillPillBorder};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.mono};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: default;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    border-color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.04);
  }
`;

const categoryIcons: Record<string, string> = {
  cybersecurity: '🛡️',
  tools: '🔧',
  programming: '💻',
  blockchain: '⛓️',
};

export default function Skills() {
  const t = useTranslations('skills');
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Section id="skills">
      <Container>
        <SectionHeader>
          <SectionTitle>
            <GradientText>{t('title')}</GradientText>
          </SectionTitle>
          <Divider />
          <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
        </SectionHeader>

        <SkillsGrid ref={ref as React.RefObject<HTMLDivElement>}>
          {skillCategories.map((category, index) => (
            <SkillCard key={category.id} $visible={isVisible} $delay={index * 120}>
              <CategoryHeader>
                <CategoryIcon>{categoryIcons[category.id] || '📦'}</CategoryIcon>
                <CategoryName>{t(`categories.${category.id}` as any)}</CategoryName>
              </CategoryHeader>

              <SkillPills>
                {category.skills.map((skill) => (
                  <SkillPill key={skill}>{skill}</SkillPill>
                ))}
              </SkillPills>
            </SkillCard>
          ))}
        </SkillsGrid>
      </Container>
    </Section>
  );
}
