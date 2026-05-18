import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, type RenderOptions } from '@testing-library/react';
import { createRouter, RouterProvider, createMemoryHistory } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorInfo } from '@/components/error-info';

interface RenderWithFileRoutesOptions extends Omit<RenderOptions, 'wrapper'> {
  initialLocation?: string;
  routerContext?: object;
}

// Create test router with generated route tree
export function createTestRouterFromFiles(initialLocation = '/') {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: {
      // Add any required context for your routes
    },
  });

  return router;
}

// Custom render function for file-based routes
export function renderWithFileRoutes(
  ui: React.ReactElement,
  { initialLocation = '/', routerContext = {}, ...renderOptions }: RenderWithFileRoutesOptions = {}
) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: routerContext,
  });

  const RouterProviderWithChildren = RouterProvider as React.ComponentType<
    React.ComponentProps<typeof RouterProvider> & { children?: React.ReactNode }
  >;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ErrorBoundary Fallback={ErrorInfo}>
        <RouterProviderWithChildren router={router}>{children}</RouterProviderWithChildren>
      </ErrorBoundary>
    );
  }

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    router,
  };
}

// Helper to test specific file routes
export function createMockFileRoute(path: string, component: React.ComponentType) {
  // This is useful for isolated testing when you don't want to use the full route tree
  return {
    path,
    component,
    // Add other common route properties as needed
  };
}
