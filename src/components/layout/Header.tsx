'use client';

import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useTranslations } from 'next-intl';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/ui/LanguageToggle';

const HeaderWrapper = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  z-index: ${({ theme }) => theme.zIndex.sticky};
  display: flex;
  align-items: center;
  transition: all ${({ theme }) => theme.transitions.normal};

  ${({ $scrolled, theme }) =>
    $scrolled
      ? css`
          background: ${theme.colors.navBg};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid ${theme.colors.border};
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        `
      : css`
          background: transparent;
        `}
`;

const Nav = styled.nav`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  flex-shrink: 0;
`;

const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  color: ${({ theme }) => theme.colors.primary};
`;

const LogoText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const NavLink = styled.a`
  display: block;
  padding: 0.4rem 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.fast};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
`;

const MenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.navBg};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.sm};
  z-index: ${({ theme }) => theme.zIndex.sticky};
  transform: ${({ $open }) => ($open ? 'translateY(0)' : 'translateY(-10px)')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: all ${({ theme }) => theme.transitions.normal};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const MobileNavLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.sm};
`;

const MobileNavLink = styled.a`
  display: block;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const navItems = [
  { href: '#about', key: 'about' },
  { href: '#education', key: 'education' },
  { href: '#skills', key: 'skills' },
  { href: '#certifications', key: 'certifications' },
  { href: '#projects', key: 'projects' },
  { href: '#journey', key: 'journey' },
  { href: '#contact', key: 'contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations('nav');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <HeaderWrapper $scrolled={scrolled}>
        <Nav>
          <Logo href="#hero">
            <LogoIcon>
              <svg viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 2L3 9V22C3 31.5 9.5 40.3 18 43C26.5 40.3 33 31.5 33 22V9L18 2Z"
                  fill="currentColor"
                  opacity="0.15"
                />
                <path
                  d="M18 2L3 9V22C3 31.5 9.5 40.3 18 43C26.5 40.3 33 31.5 33 22V9L18 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22L16 26L24 16"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </LogoIcon>
            <LogoText>
              <span>TL</span>P
            </LogoText>
          </Logo>

          <NavLinks>
            {navItems.map((item) => (
              <li key={item.key}>
                <NavLink href={item.href}>{t(item.key as any)}</NavLink>
              </li>
            ))}
          </NavLinks>

          <Controls>
            <ThemeToggle />
            <LanguageToggle />
            <MenuButton
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </MenuButton>
          </Controls>
        </Nav>
      </HeaderWrapper>

      <MobileMenu $open={menuOpen}>
        <MobileNavLinks>
          {navItems.map((item) => (
            <li key={item.key}>
              <MobileNavLink href={item.href} onClick={handleNavClick}>
                {t(item.key as any)}
              </MobileNavLink>
            </li>
          ))}
        </MobileNavLinks>
      </MobileMenu>
    </>
  );
}
