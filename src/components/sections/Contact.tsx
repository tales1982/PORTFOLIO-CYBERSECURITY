'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useTranslations, useLocale } from 'next-intl';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Section, Container, SectionTitle, SectionSubtitle, SectionHeader, GradientText, Divider } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateX(${({ $visible }) => ($visible ? 0 : '-30px')});
  transition: all 0.7s ease;
`;

const AvailabilityCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AvailabilityRoles = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const ContactCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ContactCard = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem ${({ theme }) => theme.spacing.md};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}66;
    box-shadow: ${({ theme }) => theme.colors.cardShadow};
    transform: translateX(6px);
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ContactCardIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.skillPillBg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ContactCardText = styled.div`
  flex: 1;
`;

const ContactCardLabel = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.mono};
  margin-bottom: 0.2rem;
`;

const ContactCardValue = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: inherit;
`;

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CVButton = styled(Button)`
  width: 100%;
  justify-content: center;
`;

const ContactForm = styled.form<{ $visible: boolean }>`
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateX(${({ $visible }) => ($visible ? 0 : '30px')});
  transition: all 0.7s ease 0.2s;
`;

const FormTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const FormInput = styled.input`
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  font-family: ${({ theme }) => theme.fonts.body};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  resize: vertical;
  min-height: 140px;
  transition: border-color ${({ theme }) => theme.transitions.fast};
  font-family: ${({ theme }) => theme.fonts.body};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

const SuccessMessage = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.successBg};
  border: 1px solid ${({ theme }) => theme.colors.success}44;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.errorBg};
  border: 1px solid ${({ theme }) => theme.colors.error}44;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
`;

const contactLinks = [
  {
    labelKey: 'email',
    value: 'tales_lima_1982@hotmail.com',
    href: 'mailto:tales_lima_1982@hotmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    labelKey: 'linkedin',
    value: 'linkedin.com/in/tales-lima-de-paula',
    href: 'https://www.linkedin.com/in/tales-lima-de-paula/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    labelKey: 'github',
    value: 'github.com/tales1982',
    href: 'https://github.com/tales1982',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    labelKey: 'location',
    value: 'Luxembourg',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const cvFiles: Record<string, string> = {
  en: '/cv/Tales_Lima_CV_EN_SecOps.pdf',
  fr: '/cv/Tales_Lima_CV_FR_SecOps.pdf',
};

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbgrrqgb';

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const cvUrl = cvFiles[locale] ?? cvFiles.en;
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target as HTMLFormElement),
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section id="contact">
      <Container>
        <SectionHeader>
          <SectionTitle>
            <GradientText>{t('title')}</GradientText>
          </SectionTitle>
          <Divider />
          <SectionSubtitle>{t('subtitle')}</SectionSubtitle>
        </SectionHeader>

        <ContactGrid>
          <ContactInfo $visible={leftVisible} ref={leftRef as React.RefObject<HTMLDivElement>}>
            <AvailabilityCard>
              <Badge $variant="success">
                <span style={{ width: '6px', height: '6px', background: 'currentColor', borderRadius: '50%', display: 'inline-block' }} />
                {t('availableFor')}
              </Badge>
              <AvailabilityRoles>{t('roles')}</AvailabilityRoles>
            </AvailabilityCard>

            <ContactCards>
              {contactLinks.map((link) => (
                <ContactCard
                  key={link.labelKey}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <ContactCardIcon>{link.icon}</ContactCardIcon>
                  <ContactCardText>
                    <ContactCardLabel>{t(link.labelKey as any)}</ContactCardLabel>
                    <ContactCardValue>{link.value}</ContactCardValue>
                  </ContactCardText>
                  <ChevronIcon />
                </ContactCard>
              ))}
            </ContactCards>

            <CVButton
              as="a"
              href={cvUrl}
              download
              $variant="primary"
              $size="lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t('downloadCV')}
            </CVButton>
          </ContactInfo>

          <ContactForm
            $visible={rightVisible}
            ref={rightRef as React.RefObject<HTMLFormElement>}
            onSubmit={handleSubmit}
          >
            <FormTitle>{t('sendMessage')}</FormTitle>

            {status === 'success' && (
              <SuccessMessage>{t('successMessage')}</SuccessMessage>
            )}
            {status === 'error' && (
              <ErrorMessage>{t('errorMessage')}</ErrorMessage>
            )}

            <FormField>
              <FormLabel htmlFor="contact-name">Name</FormLabel>
              <FormInput
                id="contact-name"
                name="name"
                type="text"
                placeholder={t('namePlaceholder')}
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
              />
            </FormField>

            <FormField>
              <FormLabel htmlFor="contact-email">Email</FormLabel>
              <FormInput
                id="contact-email"
                name="email"
                type="email"
                placeholder={t('emailPlaceholder')}
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
              />
            </FormField>

            <FormField>
              <FormLabel htmlFor="contact-message">Message</FormLabel>
              <FormTextarea
                id="contact-message"
                name="message"
                placeholder={t('messagePlaceholder')}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
              />
            </FormField>

            <Button type="submit" $variant="primary" $size="lg" $fullWidth disabled={status === 'sending'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              {status === 'sending' ? t('sending') : t('send')}
            </Button>
          </ContactForm>
        </ContactGrid>
      </Container>
    </Section>
  );
}
