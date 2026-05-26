import { screen, waitFor } from '@/__tests__/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockResult } from '@/__tests__/mocks';
import { Main } from './main';
import { server } from '@/__tests__/vitest.setup';
import { http, HttpResponse } from 'msw';
import { url } from '@/consts';
import { renderWithFileRoutes } from '@/__tests__/file-route-utils';

describe('Main component ', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should display default list of movies', async () => {
    renderWithFileRoutes(<Main />);

    await waitFor(() => {
      expect(screen.getByText(mockResult.Search[0].Title)).toBeInTheDocument();
      expect(screen.getByAltText(mockResult.Search[0].Title)).toHaveAttribute('src');

      expect(screen.getByText(mockResult.Search[1].Title)).toBeInTheDocument();
      expect(screen.getByAltText(mockResult.Search[1].Title)).toHaveAttribute('src');
    });
  });

  it('should render correct numbers of movies', async () => {
    renderWithFileRoutes(<Main />);

    await waitFor(() => {
      expect(screen.getAllByRole('article')).toHaveLength(mockResult.Search.length);
    });
  });

  it('should update query and fetch new movies on search', async () => {
    const { user } = renderWithFileRoutes(<Main />);

    const searchInput = await screen.findByRole('searchbox');
    const searchButton = await screen.findByRole('button', { name: /search/i });

    await user.clear(searchInput);
    await user.type(searchInput, 'terminator');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getAllByRole('article')).toHaveLength(mockResult.Search.length);
    });
  });

  it('should handle fetch errors', async () => {
    server.use(
      http.get(url, () => {
        return HttpResponse.error();
      })
    );

    renderWithFileRoutes(<Main />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
    });
  });

  it('should handle non-Error exceptions', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce('Unexpected error');

    renderWithFileRoutes(<Main />, { initialLocation: '/?search=&page=1' });

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
    });

    vi.restoreAllMocks();
  });

  it('should abort fetch on unmount', async () => {
    const abortSpy = vi.spyOn(AbortController.prototype, 'abort');
    const { unmount } = renderWithFileRoutes(<Main />);

    unmount();

    await waitFor(() => {
      expect(abortSpy).toHaveBeenCalled();
    });

    abortSpy.mockRestore();
  });
});
