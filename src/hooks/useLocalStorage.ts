'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';
import { storageKey } from '@/consts';

export function useLocalStorage(key = storageKey) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRenderRef = useRef(true);

  const search = searchParams.get('search') ?? '';

  const rawPage = searchParams.get('page');
  const parsedPage = Number(rawPage);
  const page = rawPage && !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  useEffect(() => {
    if (!isFirstRenderRef.current) return;
    isFirstRenderRef.current = false;

    try {
      const savedSearch = localStorage.getItem(key);
      if (savedSearch && !searchParams.has('search')) {
        const params = new URLSearchParams(searchParams);
        params.set('search', savedSearch);
        params.set('page', '1');

        router.replace(`${pathname}?${params.toString()}`);
      }
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
    }
  }, [router, pathname, searchParams, key]);

  const updateStorage = (value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Failed to write to localStorage:', error);
    }

    const params = new URLSearchParams(searchParams);
    params.set('search', value);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return { search, page, updateStorage };
}
