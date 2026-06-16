'use client';

import { Suspense } from 'react';
import { Search } from '@/components/search';
import { Flyout } from '@/components/flyout';
import { CardList } from '@/components/card-list';
import { fetchMovies } from '@/services/api';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const getCardListQueryOptions = (search: string, page: number) => ({
  queryKey: ['movies', search, page] as const,
  queryFn: () => fetchMovies(search, page),
});

export function Main() {
  const { search, page, updateStorage } = useLocalStorage();

  const spinner = <section role="alert" aria-busy="spinner" aria-details="spinner" style={{ textAlign: 'center' }} />;

  return (
    <main>
      <Search onSearch={updateStorage} placeholder="Search..." initialValue={search} key={search} />
      <hr role="separator" />
      <section className="split-view">
        <Suspense fallback={spinner}>
          <CardList queryOptions={getCardListQueryOptions(search, page)} page={page} />
        </Suspense>
      </section>
      <Flyout />
    </main>
  );
}
