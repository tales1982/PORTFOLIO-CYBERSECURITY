'use client';

import styled from 'styled-components';
import { useLocale, useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import { setLocale } from '@/store/languageSlice';
import type { Locale } from '@/types';

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const LangButton = styled.button<{ $active: boolean }>`
  padding: 0.35rem 0.65rem;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.mono};
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? '#ffffff' : theme.colors.textSecondary};

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary : theme.colors.surfaceHover};
    color: ${({ $active, theme }) =>
      $active ? '#ffffff' : theme.colors.primary};
  }
`;

const Separator = styled.span`
  width: 1px;
  height: 20px;
  background: ${({ theme }) => theme.colors.border};
`;

export default function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations('language');
  const dispatch = useDispatch();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    dispatch(setLocale(newLocale));
    globalThis.location.href = `/${newLocale}`;
  };

  return (
    <ToggleWrapper title={t('switchTo')}>
      <LangButton
        $active={locale === 'en'}
        onClick={() => switchLocale('en')}
        aria-label="Switch to English"
      >
        {t('en')}
      </LangButton>
      <Separator />
      <LangButton
        $active={locale === 'fr'}
        onClick={() => switchLocale('fr')}
        aria-label="Passer en français"
      >
        {t('fr')}
      </LangButton>
    </ToggleWrapper>
  );
}
