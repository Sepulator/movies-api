import { emptyMovie, emptyResult, getMovie, getUrl } from '@/consts';
import type { MovieInfo, Result } from '@/models/interfaces';

export async function fetchData<T>(url: string, empty: T) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    const data = (await response.json()) as unknown as T;
    return data;
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : 'An unexpected non-error exception occurred.';

    const data: T = {
      ...empty,
      Response: 'False',
      Error: error,
    };

    return data;
  }
}

export const fetchMovies = (query: string) => fetchData<Result>(getUrl(query), emptyResult);
export const fetchMovie = (id: string) => fetchData<MovieInfo>(getMovie(id), emptyMovie);
