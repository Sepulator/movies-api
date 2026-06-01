import { STALE_TIME } from '@/consts';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: import.meta.env.VITE_STALE_TIME || STALE_TIME } },
});
