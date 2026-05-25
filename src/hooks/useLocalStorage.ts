import { useEffect, useRef } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { storageKey } from '@/consts';

export function useLocalStorage(key = storageKey) {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const searchTerm = search.search;
  const page = search.page;
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (!isFirstRenderRef.current) return;
    const value = searchTerm || localStorage.getItem(key);

    void navigate({
      to: '.',
      search: { search: value || '', page: page || 1 },
      replace: true,
    });

    isFirstRenderRef.current = false;
  }, [navigate, key, searchTerm, page]);

  const updateStorage = (value: string) => {
    localStorage.setItem(key, value);
    void navigate({
      to: '.',
      search: { search: value, page: 1 },
      replace: true,
    });
  };

  return { search: search.search ?? '', page: search.page ?? 1, updateStorage };
}
