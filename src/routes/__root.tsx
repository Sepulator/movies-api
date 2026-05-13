import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorInfo } from '@/components/error-info';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

const RootLayout = () => (
  <ErrorBoundary Fallback={ErrorInfo}>
    <Header />
    <Outlet />
    <Footer />
    {/*<TanStackRouterDevtools />*/}
  </ErrorBoundary>
);

const NotFound = () => {
  return (
    <section>
      <article>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">Go to Home</Link>
      </article>
    </section>
  );
};

export const Route = createRootRoute({ component: RootLayout, notFoundComponent: NotFound });
