'use client';

import { Suspense } from 'react';
import { CardList } from '@/components/card-list';
import { fetchMovies } from '@/services/api';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const getCardListQueryOptions = (search: string, page: number) => ({
  queryKey: ['movies', search, page] as const,
  queryFn: () => fetchMovies(search, page),
});

export default function Page() {
  const { search, page } = useLocalStorage();

  const spinner = <section role="alert" aria-busy="spinner" aria-details="spinner" style={{ textAlign: 'center' }} />;

  return (
    <Suspense fallback={spinner}>
      <CardList queryOptions={getCardListQueryOptions(search, page)} page={page} />
    </Suspense>
  );
}
