'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import { useTheme } from '@/hooks/useTheme';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  const [isError, setIsError] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('Header');

  const handleError = () => {
    setIsError(true);
  };

  // const handleInvalidate = void useQueryClient().invalidateQueries();

  if (isError) {
    throw new Error('Error boundary tested!');
  }

  return (
    <header>
      <Link href="/">
        <h1>{t('api')}</h1>
      </Link>

      <Link href="/">{t('home')}</Link>
      <Link href="/about">{t('about')}</Link>
      <div>
        <LanguageSwitcher />
        {/*<input type="reset" value={t('invalidate')} onClick={handleInvalidate} />*/}
        <button type="button" secondary="true" onClick={handleError}>
          {t('error')}
        </button>

        <button type="button" onClick={toggleTheme}>
          <svg role="presentation" aria-hidden="true" className="theme-icon">
            {theme === 'dark' ? <use href="/icons.svg#sun"></use> : <use href="/icons.svg#moon"></use>}
          </svg>
          {t('theme')}
        </button>
      </div>
    </header>
  );
}
