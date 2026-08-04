'use client';

import styled from 'styled-components';

export const Section = styled.section<{ $alt?: boolean }>`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  background: ${({ $alt, theme }) =>
    $alt ? theme.colors.backgroundAlt : theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']} 0;
  }
`;

export const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

export const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  max-width: 600px;
`;

export const SectionHeader = styled.div<{ $centered?: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  text-align: ${({ $centered }) => ($centered ? 'center' : 'left')};

  ${SectionSubtitle} {
    margin-left: ${({ $centered }) => ($centered ? 'auto' : '0')};
    margin-right: ${({ $centered }) => ($centered ? 'auto' : '0')};
  }
`;

export const GradientText = styled.span`
  background: ${({ theme }) => theme.colors.gradientText};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Divider = styled.div`
  width: 60px;
  height: 4px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin: 1rem 0 1.5rem;
`;

export const Grid = styled.div<{ $cols?: number; $gap?: string }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols = 3 }) => $cols}, 1fr);
  gap: ${({ $gap = '1.5rem' }) => $gap};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.colors.cardShadowHover};
    border-color: ${({ theme }) => theme.colors.primary}44;
  }
`;
