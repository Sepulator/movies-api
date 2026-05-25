import { createFileRoute } from '@tanstack/react-router';

import { Main } from '@/components/main';
import { validateSearch } from '@/services/validate-search';

export const Route = createFileRoute('/_layout')({
  validateSearch,
  component: SplitViewLayout,
});

function SplitViewLayout() {
  return <Main />;
}
