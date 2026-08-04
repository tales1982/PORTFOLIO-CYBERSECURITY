'use client';

import styled, { css } from 'styled-components';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default' | 'primary';

interface BadgeProps {
  $variant?: BadgeVariant;
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.mono};
  border: 1px solid transparent;

  ${({ $variant = 'default', theme }) =>
    ({
      success: css`
        background: ${theme.colors.successBg};
        color: ${theme.colors.success};
        border-color: ${theme.colors.success}33;
      `,
      warning: css`
        background: ${theme.colors.warningBg};
        color: ${theme.colors.warning};
        border-color: ${theme.colors.warning}33;
      `,
      error: css`
        background: ${theme.colors.errorBg};
        color: ${theme.colors.error};
        border-color: ${theme.colors.error}33;
      `,
      info: css`
        background: ${theme.colors.infoBg};
        color: ${theme.colors.info};
        border-color: ${theme.colors.info}33;
      `,
      primary: css`
        background: ${theme.colors.skillPillBg};
        color: ${theme.colors.skillPillText};
        border-color: ${theme.colors.skillPillBorder};
      `,
      default: css`
        background: ${theme.colors.backgroundAlt};
        color: ${theme.colors.textSecondary};
        border-color: ${theme.colors.border};
      `,
    }[$variant])}
`;

export const StatusDot = styled.span<{ $active?: boolean }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.success : theme.colors.textMuted};

  ${({ $active }) =>
    $active &&
    css`
      animation: pulse 2s ease infinite;
    `}
`;
