'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, type ChangeEvent } from 'react';

import cs from './search.module.css';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function Search() {
  const { search, updateStorage } = useLocalStorage();
  const ref = useRef<HTMLInputElement>(null);
  const t = useTranslations('Search');

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ref.current) {
      updateStorage(ref.current.value.trim());
    }
  };

  useEffect(() => {
    ref.current?.focus();
  }, [search]);

  return (
    <form onSubmit={handleSubmit} className={cs.form}>
      <input
        ref={ref}
        key={search}
        type="search"
        name="search"
        defaultValue={search}
        placeholder={t('placeholder') || ''}
        className={cs.input}
      />
      <button type="submit" className={cs.button}>
        {t('search')}
      </button>
    </form>
  );
}
