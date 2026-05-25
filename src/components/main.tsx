import { Suspense } from 'react';
import { Outlet } from '@tanstack/react-router';

import { Search } from './search';
import { Flyout } from './flyout';
import { CardList } from './card-list';
import { fetchMovies } from '@/services/api';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function Main() {
  const { search, page, updateStorage } = useLocalStorage();

  const onSearch = (value: string) => {
    updateStorage(value);
  };

  const spinner = <section role="alert" aria-busy="spinner" aria-details="spinner" style={{ textAlign: 'center' }} />;

  return (
    <main>
      <Search onSearch={onSearch} placeholder="Search..." initialValue={search} key={search} />
      <hr role="separator" />
      <section className="split-view">
        <Suspense fallback={spinner}>
          <CardList
            queryOptions={{
              queryKey: ['movies', search, page],
              queryFn: () => fetchMovies(search, page),
            }}
            page={page}
          />
        </Suspense>

        <Suspense fallback={spinner}>
          <Outlet />
        </Suspense>
      </section>
      <Flyout />
    </main>
  );
}
