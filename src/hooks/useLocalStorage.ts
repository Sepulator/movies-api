'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { storageKey } from '@/consts';

export function useLocalStorage(key = storageKey) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFirstRenderRef = useRef(true);

  const search = searchParams.get('search') ?? '';
  const page = Number(searchParams.get('page') ?? 1);

  useEffect(() => {
    if (!isFirstRenderRef.current) return;
    isFirstRenderRef.current = false;

    const savedSearch = localStorage.getItem(key);
    if (savedSearch && !searchParams.has('search')) {
      const params = new URLSearchParams(searchParams);
      params.set('search', savedSearch);
      params.set('page', '1');
      router.replace(`/?${params.toString()}`);
    }
  }, [router, searchParams, key]);

  const updateStorage = (value: string) => {
    localStorage.setItem(key, value);
    const params = new URLSearchParams(searchParams);
    params.set('search', value);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  return { search, page, updateStorage };
}
