'use client';

import { useState } from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { useTranslations, useLocale } from 'next-intl';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Section, Container, SectionTitle, SectionSubtitle, SectionHeader, GradientText, Divider } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { projects } from '@/data/projects';
import type { ProjectCategory, LocalizedString } from '@/types';

function localize(value: string | LocalizedString, locale: string): string {
  if (typeof value === 'string') return value;
  return value[locale as 'en' | 'fr'] ?? value.en;
}

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 0.4rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-family: ${({ theme }) => theme.fonts.mono};
  border: 1px solid;

  ${({ $active, theme }) =>
    $active
      ? css`
          background: ${theme.colors.gradient};
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
        `
      : css`
          background: transparent;
          color: ${theme.colors.textSecondary};
          border-color: ${theme.colors.border};

          &:hover {
            border-color: ${theme.colors.primary};
            color: ${theme.colors.primary};
          }
        `}
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const categoryColors: Record<string, string> = {
  security: '#EF4444',
  development: '#8B5CF6',
  blockchain: '#F59E0B',
};

const categoryLabels: Record<string, string> = {
  security: '🛡️',
  development: '💻',
  blockchain: '⛓️',
};

const ProjectCard = styled.div<{ $visible: boolean; $delay: number; $category: string }>`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? 0 : '40px')});
  transition:
    opacity 0.6s ease ${({ $delay }) => $delay}ms,
    transform 0.6s ease ${({ $delay }) => $delay}ms,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $category }) => categoryColors[$category] || '#0052CC'};
  }

  &:hover {
    border-color: ${({ $category }) => categoryColors[$category] || '#0052CC'}66;
    box-shadow: 0 8px 30px ${({ $category }) => categoryColors[$category] || '#0052CC'}15;
    transform: translateY(-6px);
  }
`;

const ProjectThumb = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundAlt};

  img {
    object-fit: cover;
    object-position: top;
    transition: transform 0.4s ease;
  }

  ${ProjectCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ProjectHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
`;

const ProjectIcon = styled.div`
  font-size: 1.75rem;
  line-height: 1;
`;

const ProjectFeatured = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem 0.6rem;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.7rem;
  font-weight: 600;
  color: #F59E0B;
  font-family: ${({ theme }) => theme.fonts.mono};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ProjectBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ProjectName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
`;

const ProjectDesc = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  flex: 1;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const TechTag = styled.span`
  padding: 0.2rem 0.6rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.7rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

const ProjectFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  display: flex;
  gap: 0.5rem;
`;

const filters: { label: string; value: ProjectCategory }[] = [
  { label: 'filterAll', value: 'all' },
  { label: 'filterSecurity', value: 'security' },
  { label: 'filterDevelopment', value: 'development' },
  { label: 'filterBlockchain', value: 'blockchain' },
];

export default function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const { ref, isVisible } = useScrollAnimation();

  const filtered =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <Section id="projects">
      <Container>
        <SectionHeader>
          <SectionTitle>
            <GradientText>{t('title')}</GradientText>
          </SectionTitle>
          <Divider />
          <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
        </SectionHeader>

        <FilterBar>
          {filters.map((f) => (
            <FilterButton
              key={f.value}
              $active={activeFilter === f.value}
              onClick={() => setActiveFilter(f.value)}
            >
              {t(f.label as any)}
            </FilterButton>
          ))}
        </FilterBar>

        <ProjectsGrid ref={ref as React.RefObject<HTMLDivElement>}>
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              $visible={isVisible}
              $delay={index * 80}
              $category={project.category}
            >
              <ProjectThumb>
                <Image
                  src={project.image}
                  alt={localize(project.name, locale)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                />
              </ProjectThumb>

              <ProjectHeader>
                <ProjectIcon>{categoryLabels[project.category]}</ProjectIcon>
                {project.featured && (
                  <ProjectFeatured>⭐ {t('featured')}</ProjectFeatured>
                )}
              </ProjectHeader>

              <ProjectBody>
                <ProjectName>{localize(project.name, locale)}</ProjectName>
                <ProjectDesc>{localize(project.description, locale)}</ProjectDesc>
                <TechTags>
                  {project.technologies.map((tech) => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </TechTags>
              </ProjectBody>

              <ProjectFooter>
                {project.demoUrl && (
                  <Button
                    as="a"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    $variant="primary"
                    $size="sm"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    {t('viewDemo')}
                  </Button>
                )}
              </ProjectFooter>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </Section>
  );
}
