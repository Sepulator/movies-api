import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorInfo } from '@/components/error-info';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <ErrorBoundary Fallback={ErrorInfo}>
      <Header />
      <Outlet />
      <Footer />
      {/*<TanStackRouterDevtools />*/}
    </ErrorBoundary>
  );
}

function NotFound() {
  return (
    <section>
      <article>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link search={{ search: '', page: 1 }} to="/">
          Go to Home
        </Link>
      </article>
    </section>
  );
}
