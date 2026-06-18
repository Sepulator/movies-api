'use client';

import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: 'en' | 'ru') => {
    startTransition(() => {
      // @ts-expect-error -- TypeScript will validate that only known `params`
      router.replace({ pathname, params }, { locale: newLocale });
    });
  };

  return (
    <button
      onClick={() => switchLocale(locale === 'en' ? 'ru' : 'en')}
      disabled={isPending}
      className="language-switcher"
    >
      {isPending ? '...' : locale === 'en' ? 'RU' : 'EN'}
    </button>
  );
}
