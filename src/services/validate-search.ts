import type { MovieSearch } from '@/models/interfaces';

export const validateSearch = (search: Record<string, unknown>): MovieSearch => {
  return {
    details: typeof search.details === 'string' ? search.details : undefined,
    view: search.view === 'compact' || search.view === 'full' ? search.view : undefined,
    page: typeof search.page === 'string' ? search.page : undefined,
  };
};
