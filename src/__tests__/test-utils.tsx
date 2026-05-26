import '@testing-library/jest-dom';
import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorInfo } from '@/components/error-info';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary Fallback={ErrorInfo}>{children}</ErrorBoundary>
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  return { user: userEvent.setup(), ...render(ui, { wrapper: AllTheProviders, ...options }) };
};

export * from '@testing-library/react';
export { customRender as render };
