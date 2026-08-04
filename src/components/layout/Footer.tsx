'use client';

import styled from 'styled-components';
import { useTranslations } from 'next-intl';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing['2xl']} 0
    ${({ theme }) => theme.spacing.lg};
`;

const FooterInner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const FooterBrand = styled.div``;

const BrandLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const BrandIcon = styled.div`
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.primary};
`;

const BrandName = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BrandTagline = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 280px;
`;

const FooterSection = styled.div``;

const FooterHeading = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const FooterLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled.a`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SocialLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    opacity: 0.7;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const MadeWith = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};

  span {
    color: ${({ theme }) => theme.colors.error};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
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

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterInner>
        <FooterTop>
          <FooterBrand>
            <BrandLogo>
              <BrandIcon>
                <svg viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2L3 9V22C3 31.5 9.5 40.3 18 43C26.5 40.3 33 31.5 33 22V9L18 2Z" fill="currentColor" opacity="0.15" />
                  <path d="M18 2L3 9V22C3 31.5 9.5 40.3 18 43C26.5 40.3 33 31.5 33 22V9L18 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M12 22L16 26L24 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </BrandIcon>
              <BrandName>
                <span>TL</span>P
              </BrandName>
            </BrandLogo>
            <BrandTagline>
              Tales Lima de Paula — Cybersecurity Student & Software Developer based in Luxembourg.
            </BrandTagline>
          </FooterBrand>

          <FooterSection>
            <FooterHeading>{t('footer.navigation')}</FooterHeading>
            <FooterLinks>
              {navItems.map((item) => (
                <li key={item.key}>
                  <FooterLink href={item.href}>{t(`nav.${item.key}`)}</FooterLink>
                </li>
              ))}
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterHeading>{t('footer.connect')}</FooterHeading>
            <SocialLinks>
              <li>
                <SocialLink href="https://github.com/tales1982" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  github.com/tales1982
                </SocialLink>
              </li>
              <li>
                <SocialLink href="https://www.linkedin.com/in/tales-lima-de-paula/" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  linkedin.com/in/tales-lima-de-paula
                </SocialLink>
              </li>
              <li>
                <SocialLink href="mailto:tales_lima_1982@hotmail.com">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  tales_lima_1982@hotmail.com
                </SocialLink>
              </li>
              <li>
                <SocialLink as="span" style={{ cursor: 'default' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Luxembourg
                </SocialLink>
              </li>
            </SocialLinks>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <Copyright>
            © {year} Tales Lima de Paula. {t('footer.rights')}.
          </Copyright>
          <MadeWith>
            {t('footer.madeWith')} <span>♥</span>{' '}
            {t('footer.and')}{' '}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
              Next.js
            </a>
            {' '}&{' '}
            <a href="https://styled-components.com" target="_blank" rel="noopener noreferrer">
              styled-components
            </a>
          </MadeWith>
        </FooterBottom>
      </FooterInner>
    </FooterWrapper>
  );
}
