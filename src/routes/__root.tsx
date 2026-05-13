import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorInfo } from '@/components/error-info';
import { Header } from '@/components/header';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => (
  <ErrorBoundary Fallback={ErrorInfo}>
    <Header />
    <Outlet />
    <TanStackRouterDevtools />
  </ErrorBoundary>
);

export const Route = createRootRoute({ component: RootLayout });
