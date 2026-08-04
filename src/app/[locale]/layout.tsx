import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/styled-components-registry';
import { Providers } from '@/providers/Providers';
import HtmlLang from '@/components/HtmlLang';

const locales = new Set(['en', 'fr']);

export const metadata: Metadata = {
  title: {
    default: 'Tales Lima de Paula — Cybersecurity Portfolio',
    template: '%s | Tales Lima de Paula',
  },
  description:
    'Professional cybersecurity portfolio of Tales Lima de Paula. Cybersecurity student, software developer, and blockchain background. Specializing in web security, penetration testing, and network security.',
  keywords: [
    'cybersecurity',
    'penetration testing',
    'web security',
    'network security',
    'portfolio',
    'Tales Lima de Paula',
    'Luxembourg',
    'Brussels',
    'blockchain',
    'software developer',
  ],
  authors: [{ name: 'Tales Lima de Paula' }],
  creator: 'Tales Lima de Paula',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Tales Lima de Paula — Cybersecurity Portfolio',
    description:
      'Cybersecurity student, software developer, and blockchain background. Building secure digital solutions.',
    siteName: 'Tales Lima de Paula Portfolio',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!locales.has(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <StyledComponentsRegistry>
      <NextIntlClientProvider messages={messages}>
        <Providers>
          <HtmlLang locale={locale} />
          {children}
        </Providers>
      </NextIntlClientProvider>
    </StyledComponentsRegistry>
  );
}
