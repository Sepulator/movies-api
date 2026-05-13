import { Search } from './search';
import { CardList } from './card-list';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { fetchMovies } from '@/services/api';
import { Suspense, useState } from 'react';

export function Main() {
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
      <Suspense fallback={spinner}>
        <CardList data={moviesPromise} />
      </Suspense>
    </main>
  );
}
