import { screen, waitFor } from '@/__tests__/test-utils';
import { describe, expect, it } from 'vitest';
import { Card } from './card';
import { mockMovie } from '@/__tests__/mocks';
import { renderWithFileRoutes } from '@/__tests__/file-route-utils';

describe('Card component ', () => {
  it('should display title and image alt text', async () => {
    renderWithFileRoutes(<Card movie={mockMovie} />);

    await waitFor(() => {
      expect(screen.getByText(mockMovie.Title)).toBeInTheDocument();
      expect(screen.getByAltText(mockMovie.Title)).toHaveAttribute('src');
    });
  });
});
