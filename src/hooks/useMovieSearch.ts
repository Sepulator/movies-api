import { fetchMovies } from '@/services/api';
import { useState, useEffect } from 'react';
import { type Result } from '@/models/interfaces';

export function useMovieSearch(query: string) {
  const [data, setData] = useState<Result | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        const data = await fetchMovies(query);
        if (isMounted) {
          setData(data);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch movies';
          setData({ Error: errorMessage, Search: [], Response: 'False', totalResults: '0' });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void fetchData();

    return () => {
      isMounted = false;
    };
  }, [query]);

  return { data, loading };
}
