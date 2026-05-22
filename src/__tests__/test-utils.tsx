import '@testing-library/jest-dom';
import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorInfo } from '@/components/error-info';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ErrorBoundary Fallback={ErrorInfo}>{children}</ErrorBoundary>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  return { user: userEvent.setup(), ...render(ui, { wrapper: AllTheProviders, ...options }) };
};

export * from '@testing-library/react';
export { customRender as render };
