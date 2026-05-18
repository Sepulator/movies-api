import { screen, waitFor } from '@/__tests__/test-utils';
import { describe, expect, it } from 'vitest';

import { mockMovieInfo } from '@/__tests__/mocks';
import { renderWithFileRoutes } from '@/__tests__/file-route-utils';
import { Main } from '@/components/main';

describe('CardInfo Component', () => {
  it('should renders movie information correctly when Response is True', async () => {
    renderWithFileRoutes(<Main />, {
      initialLocation: '/details/tt0103064?search=&page=1',
    });

    await waitFor(() => {
      expect(screen.getByText('Release date')).toBeInTheDocument();
      expect(screen.getByText(mockMovieInfo.Released)).toBeInTheDocument();
      expect(screen.getByText('Genres')).toBeInTheDocument();
      expect(screen.getByText(mockMovieInfo.Genre)).toBeInTheDocument();
      expect(screen.getByText('IMDB rating')).toBeInTheDocument();
      expect(screen.getByText(mockMovieInfo.imdbRating)).toBeInTheDocument();
      expect(screen.getByText('Close')).toBeInTheDocument();
    });
  });

  it('should renders error message when Response is False and Error is provided', async () => {
    renderWithFileRoutes(<Main />, {
      initialLocation: '/details/wrong-number',
    });

    await waitFor(() => {
      expect(screen.getByText('Movie not found!')).toBeInTheDocument();
      expect(screen.queryByText('Close')).not.toBeInTheDocument();
    });
  });

  it('should renders default message when Response is False and no Error is provided', async () => {
    renderWithFileRoutes(<Main />, {
      initialLocation: '/details/no-error?search=&page=1',
    });

    await waitFor(() => {
      expect(screen.getByText('Select movie card from list.')).toBeInTheDocument();
      expect(screen.queryByText('Close')).not.toBeInTheDocument();
    });
  });
});
