import { useState, Suspense } from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import { Search } from '@/components/search';
import { CardList } from '@/components/card-list';
import { fetchMovies } from '@/services/api';
import { validateSearch } from '@/services/validate-search';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const Route = createFileRoute('/_layout')({
  validateSearch,
  component: SplitViewLayout,
});

function SplitViewLayout() {
  const { query, updateQuery } = useLocalStorage();
  const [moviesPromise, setMoviesPromise] = useState(() => fetchMovies(query));

  const onSearch = (value: string) => {
    updateQuery(value);

    setMoviesPromise(fetchMovies(value));
  };

  const spinner = (
    <section role="alert" aria-busy="true" aria-details="spinner" style={{ textAlign: 'center' }}></section>
  );

  return (
    <main>
      <Search onSearch={onSearch} placeholder="Search..." initialValue={query} />
      <hr role="separator" />
      <section className="split-view">
        <Suspense fallback={spinner}>
          <CardList data={moviesPromise} />
        </Suspense>

        <Suspense fallback={spinner}>
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
}
