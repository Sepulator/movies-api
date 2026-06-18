import { useEffect, useRef, useState, type ChangeEvent, type SubmitEvent } from 'react';
import cs from './search.module.css';
import { useTranslations } from 'next-intl';

interface Props {
  initialValue?: string;
  onSearch: (value: string) => void;
}

export function Search({ initialValue, onSearch }: Props) {
  const [query, setQuery] = useState(initialValue || '');
  const ref = useRef<HTMLInputElement>(null);
  const t = useTranslations('Search');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query.trim());
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
