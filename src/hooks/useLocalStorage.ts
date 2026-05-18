import { useEffect, useRef } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';

export function useLocalStorage(storageKey = 'query') {
  const navigate = useNavigate({});
  const search = useSearch({ strict: false });
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (!isFirstRenderRef.current) return;
    const value = localStorage.getItem(storageKey) || '';

    void navigate({
      to: '.',
      search: { search: value, page: 1 },
      replace: true,
    });

    isFirstRenderRef.current = false;
  }, [navigate, storageKey]);

  const updateStorage = (value: string) => {
    localStorage.setItem(storageKey, value);
    void navigate({
      to: '.',
      search: { search: value, page: 1 },
      replace: true,
    });
  };

  return { search: search.search ?? '', page: search.page ?? 1, updateStorage };
}
