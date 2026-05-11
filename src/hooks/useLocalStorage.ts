import { useState } from 'react';

export function useLocalStorage(key = 'query') {
  const [query, setQuery] = useState(() => localStorage.getItem(key) || '');

  const updateQuery = (value: string) => {
    setQuery(value);
    localStorage.setItem(key, value);
  };

  return { query, updateQuery };
}
