import { createFileRoute } from '@tanstack/react-router';

import { validateSearch } from '@/services/validate-search';

import { Main } from '@/components/main';

export const Route = createFileRoute('/_layout')({
  validateSearch,
  component: SplitViewLayout,
});

function SplitViewLayout() {
  return <Main />;
}
