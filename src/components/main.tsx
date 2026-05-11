import { Search } from './search';
import { CardList } from './card-list';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useMovieSearch } from '@/hooks/useMovieSearch';

export function Main() {
  const { query, updateQuery } = useLocalStorage();
  const { data, loading } = useMovieSearch(query);

  const onSearch = (value: string) => {
    updateQuery(value);
  };

  return (
    <main>
      <Search onSearch={onSearch} placeholder="Search..." initialValue={query} />
      <hr role="separator" />
      {data && <CardList data={data} loading={loading} />}
    </main>
  );
}
