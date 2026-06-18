'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, type ChangeEvent, type SubmitEvent } from 'react';

import cs from './search.module.css';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function Search() {
  const { search, updateStorage } = useLocalStorage();
  const [query, setQuery] = useState(search || '');
  const ref = useRef<HTMLInputElement>(null);
  const t = useTranslations('Search');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateStorage(query.trim());
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className={cs.form}>
      <input
        ref={ref}
        type="search"
        name="search"
        value={query}
        placeholder={t('placeholder') || ''}
        className={cs.input}
        onChange={handleChange}
      />
      <button type="submit" className={cs.button}>
        {t('search')}
      </button>
    </form>
  );
}
