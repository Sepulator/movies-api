import { useMemo, Suspense } from 'react';
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
      <Search onSearch={onSearch} placeholder="Search..." initialValue={search} />
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
