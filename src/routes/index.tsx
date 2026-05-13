import { Footer } from '@/components/footer';
import { Main } from '@/components/main';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

export function Index() {
  return (
    <>
      <Main />
      <Footer />
    </>
  );
}
