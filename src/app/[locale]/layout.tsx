import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import Providers from './providers';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
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
            <main>
              <Header />
              {children}
              <Footer />
            </main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
