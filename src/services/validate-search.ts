import type { MovieSearch } from '@/models/interfaces';

export const validateSearch = (search: Record<string, unknown>): MovieSearch => {
  return {
    search: typeof search.search === 'string' ? search.search : '',
    page: Number(search.page ?? 1),
  };
};
