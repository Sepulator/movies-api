import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import Providers from './providers';
import { MainLayout } from '../main-layout';
import { routing } from '@/i18n/routing';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
  details: React.ReactNode;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params, details }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body id="root">
        <NextIntlClientProvider>
          <Providers>
            <MainLayout>
              <section className="split-view">
                {children}
                {details}
              </section>
            </MainLayout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
