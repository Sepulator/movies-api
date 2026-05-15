import { Suspense, useMemo } from 'react';

import { Search } from './search';
import { CardList } from './card-list';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { fetchMovies } from '@/services/api';

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
      <Search onSearch={onSearch} placeholder="Search..." initialValue={search} />
      <hr role="separator" />
      <Suspense fallback={spinner}>
        <CardList data={moviesPromise} page={page} />
      </Suspense>
    </main>
  );
}
