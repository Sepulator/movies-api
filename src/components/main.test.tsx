import { render, screen, waitFor } from '@/__tests__/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { mockResult } from '@/__tests__/mocks';
import { Main } from './main';
import { server } from '@/__tests__/vitest.setup';
import { http, HttpResponse } from 'msw';
import { url } from '@/consts';

describe('Main component ', () => {
  it('should display default list of movies', async () => {
    render(<Main />);

    await waitFor(() => {
      expect(screen.getByText(mockResult.Search[0].Title)).toBeInTheDocument();
      expect(screen.getByAltText(mockResult.Search[0].Title)).toHaveAttribute('src');

      expect(screen.getByText(mockResult.Search[1].Title)).toBeInTheDocument();
      expect(screen.getByAltText(mockResult.Search[1].Title)).toHaveAttribute('src');
    });
  });

  it('should render correct numbers of movies', async () => {
    render(<Main />);

    await waitFor(() => {
      expect(screen.getAllByRole('article')).toHaveLength(mockResult.Search.length);
    });
  });

  it('should update query and fetch new movies on search', async () => {
    const { user } = render(<Main />);

    const searchInput = screen.getByRole('searchbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

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

    render(<Main />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
    });
  });

  it('should handle non-Error exceptions', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce('Unexpected error');

    render(<Main />);

    await waitFor(() => {
      expect(screen.getByText(/An unexpected non-error exception occurred/i)).toBeInTheDocument();
    });

    vi.restoreAllMocks();
  });

  it('should abort fetch on unmount', async () => {
    const abortSpy = vi.spyOn(AbortController.prototype, 'abort');
    const { unmount } = render(<Main />);

    unmount();

    await waitFor(() => {
      expect(abortSpy).toHaveBeenCalled();
    });

    abortSpy.mockRestore();
  });
});
