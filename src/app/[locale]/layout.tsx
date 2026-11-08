import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata, Viewport } from 'next';
import { Funnel_Display, Funnel_Sans } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/styled-components-registry';
import { Providers } from '@/providers/Providers';
import { routing } from '@/i18n/routing';

const display = Funnel_Display({ subsets: ['latin', 'latin-ext'], variable: '--font-display', display: 'swap' });
const body = Funnel_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-body', display: 'swap' });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio-cybersecurity-zeta.vercel.app';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: '#17191d' };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    authors: [{ name: 'Tales Lima de Paula' }],
    keywords: ['SOC Analyst', 'SOC L1', 'Blue Team', 'Wazuh', 'Suricata', 'TheHive', 'Ansible', 'Luxembourg', 'Cybersecurity', 'Java', 'Spring Boot', 'Solidity'],
    alternates: { canonical: `/${locale}`, languages: { en: '/en', fr: '/fr' } },
    openGraph: {
      type: 'profile',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url: `/${locale}`,
      title: t('title'),
      description: t('description'),
      siteName: 'Tales Lima de Paula',
      images: [{ url: '/images/about/profile.png', width: 1254, height: 1254, alt: 'Tales Lima de Paula' }],
    },
    twitter: { card: 'summary', title: t('title'), description: t('description') },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <body data-tone="dark">
        <StyledComponentsRegistry>
          <NextIntlClientProvider messages={messages}>
            <Providers>{children}</Providers>
          </NextIntlClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
