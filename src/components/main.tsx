import { Suspense, useMemo } from 'react';

import { Search } from './search';
import { CardList } from './card-list';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { fetchMovies } from '@/services/api';
import { Outlet } from '@tanstack/react-router';

export function Main() {
  const { search, page, updateStorage } = useLocalStorage();
  const moviesPromise = useMemo(() => fetchMovies(search, page), [search, page]);

  const onSearch = (value: string) => {
    updateStorage(value);
  };

  const spinner = (
    <section role="alert" aria-busy="true" aria-details="spinner" style={{ textAlign: 'center' }}></section>
  );

  return (
    <main>
      <Search onSearch={onSearch} placeholder="Search..." initialValue={search} key={search} />
      <hr role="separator" />
      <section className="split-view">
        <Suspense fallback={spinner}>
          <CardList data={moviesPromise} page={page} />
        </Suspense>

        <Suspense fallback={spinner}>
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
}
