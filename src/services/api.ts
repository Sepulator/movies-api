import { getUrl } from '@/consts';
import type { Result } from '@/models/interfaces';

export async function fetchMovies(query: string) {
  try {
    const response = await fetch(getUrl(query));

    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    const data = (await response.json()) as unknown as Result;
    return data;
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : 'An unexpected non-error exception occurred.';

    const data: Result = {
      Search: [],
      totalResults: '0',
      Response: 'False',
      Error: error,
    };

    return data;
  }
}
