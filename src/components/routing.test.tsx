import { describe, it, expect } from 'vitest';
import { Outlet } from '@tanstack/react-router';

import { renderWithFileRoutes } from '@/__tests__/file-route-utils';
import { screen, waitFor } from '@/__tests__/test-utils';

describe('Routing', () => {
  it('should render the about page', async () => {
    renderWithFileRoutes(<Outlet />, { initialLocation: '/about' });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'About', level: 2 })).toBeInTheDocument();
    });
  });

  it('should render the 404 page for unknown routes', async () => {
    renderWithFileRoutes(<Outlet />, { initialLocation: '/non-existent-route' });

    await waitFor(() => {
      expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    });
  });
});
