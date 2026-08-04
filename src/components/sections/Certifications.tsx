'use client';

import styled from 'styled-components';
import { useTranslations, useLocale } from 'next-intl';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { LocalizedString, CertStatus } from '@/types';
import { Section, Container, SectionTitle, SectionSubtitle, SectionHeader, GradientText, Divider } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { certifications } from '@/data/certifications';

const CertGrid = styled.div`
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

const CertCard = styled.div<{ $visible: boolean; $delay: number }>`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? 0 : '40px')});
  transition:
    opacity 0.6s ease ${({ $delay }) => $delay}ms,
    transform 0.6s ease ${({ $delay }) => $delay}ms,
    box-shadow 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}55;
    box-shadow: ${({ theme }) => theme.colors.cardShadowHover};
    transform: translateY(-6px);
  }
`;

const CertImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const CertFallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: 100%;
`;

const CertImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
  padding: 0.5rem;
`;

const CertBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
`;

const CertName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
`;

const CertIssuer = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const CertDates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const CertDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.fonts.mono};

  svg {
    width: 12px;
    height: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  span {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
  }
`;

const CertFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  margin-top: auto;
`;

const statusVariants: Record<CertStatus, 'success' | 'error' | 'default'> = {
  valid: 'success',
  expired: 'error',
  noExpiration: 'default',
};

const CertFallbackIcon = () => (
  <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 2L3 12V28C3 40 12 51 24 54C36 51 45 40 45 28V12L24 2Z" fill="currentColor" opacity="0.1" />
    <path d="M24 2L3 12V28C3 40 12 51 24 54C36 51 45 40 45 28V12L24 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M16 28L21 33L32 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function CertImageOrFallback({ src, name }: { src: string; name: string }) {
  return (
    <CertImageWrapper>
      {src && !src.startsWith('#') ? (
        <CertImage
          src={src}
          alt={name}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <CertFallback>
          <CertFallbackIcon />
        </CertFallback>
      )}
    </CertImageWrapper>
  );
}

function localize(value: string | LocalizedString, locale: string): string {
  if (typeof value === 'string') return value;
  return value[locale as 'en' | 'fr'] ?? value.en;
}

export default function Certifications() {
  const t = useTranslations('certifications');
  const locale = useLocale();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <Section id="certifications" $alt>
      <Container>
        <SectionHeader>
          <SectionTitle>
            <GradientText>{t('title')}</GradientText>
          </SectionTitle>
          <Divider />
          <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
        </SectionHeader>

        <CertGrid ref={ref as React.RefObject<HTMLDivElement>}>
          {certifications.map((cert, index) => (
            <CertCard key={cert.id} $visible={isVisible} $delay={index * 100}>
              <CertImageOrFallback src={cert.image} name={localize(cert.name, locale)} />

              <CertBody>
                <div>
                  <CertName>{localize(cert.name, locale)}</CertName>
                  <CertIssuer>{localize(cert.issuer, locale)}</CertIssuer>
                </div>

                <CertDates>
                  <CertDate>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {t('issued')}: <span>{cert.issueDate}</span>
                  </CertDate>
                  <CertDate>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {cert.expirationDate
                      ? `${t('expires')}: ${cert.expirationDate}`
                      : t('noExpiry')}
                  </CertDate>
                </CertDates>

                <CertFooter>
                  <Badge $variant={statusVariants[cert.status]}>
                    {t(`status.${cert.status}` as any)}
                  </Badge>
                  <Button
                    as="a"
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    $variant="ghost"
                    $size="sm"
                  >
                    {t('viewCredential')}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </Button>
                </CertFooter>
              </CertBody>
            </CertCard>
          ))}
        </CertGrid>
      </Container>
    </Section>
  );
}
