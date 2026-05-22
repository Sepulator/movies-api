import { screen, waitFor } from '@/__tests__/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';

import { useMoviesStoreBase } from '@/store/store';
import { mockMovie, mockMovie2 } from '@/__tests__/mocks';
import { renderWithFileRoutes } from '@/__tests__/file-route-utils';
import { Main } from './main';

describe('Flyout Component', () => {
  beforeEach(() => {
    useMoviesStoreBase.getState().reset();
  });

  it('should not render if there are no movies', async () => {
    renderWithFileRoutes(<Main />);

    await waitFor(() => {
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });
  });

  it('should render selected movie count', async () => {
    useMoviesStoreBase.setState({
      movies: [mockMovie, mockMovie2],
    });

    renderWithFileRoutes(<Main />);

    expect(await screen.findByText(/Selected movies: 2/i)).toBeInTheDocument();
  });

  it('should call resetMovies when Unselect button is clicked', async () => {
    useMoviesStoreBase.setState({
      movies: [mockMovie],
    });

    const { user } = renderWithFileRoutes(<Main />);

    const unselectBtn = await screen.findByRole('button', { name: /Unselect/i });
    await user.click(unselectBtn);

    expect(useMoviesStoreBase.getState().movies).toHaveLength(0);
  });
});
