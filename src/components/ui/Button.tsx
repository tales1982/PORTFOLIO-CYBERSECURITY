'use client';

import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  border: 2px solid transparent;
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: 0.01em;

  ${({ $size = 'md' }) =>
    ({
      sm: css`
        padding: 0.4rem 1rem;
        font-size: 0.875rem;
      `,
      md: css`
        padding: 0.625rem 1.5rem;
        font-size: 1rem;
      `,
      lg: css`
        padding: 0.875rem 2rem;
        font-size: 1.0625rem;
      `,
    }[$size])}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ $variant = 'primary', theme }) =>
    ({
      primary: css`
        background: ${theme.colors.gradient};
        color: #ffffff;
        border-color: transparent;
        box-shadow: 0 4px 15px rgba(0, 82, 204, 0.3);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 82, 204, 0.4);
          color: #ffffff;
        }

        &:active {
          transform: translateY(0);
        }
      `,
      secondary: css`
        background: ${theme.colors.surface};
        color: ${theme.colors.text};
        border-color: ${theme.colors.border};

        &:hover {
          background: ${theme.colors.surfaceHover};
          border-color: ${theme.colors.primary};
          color: ${theme.colors.primary};
          transform: translateY(-2px);
        }
      `,
      outline: css`
        background: transparent;
        color: ${theme.colors.primary};
        border-color: ${theme.colors.primary};

        &:hover {
          background: ${theme.colors.primary};
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 82, 204, 0.3);
        }
      `,
      ghost: css`
        background: transparent;
        color: ${theme.colors.textSecondary};
        border-color: transparent;

        &:hover {
          color: ${theme.colors.primary};
          background: ${theme.colors.surfaceHover};
        }
      `,
    }[$variant])}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

export const LinkButton = styled(Button).attrs({ as: 'a' })``;
