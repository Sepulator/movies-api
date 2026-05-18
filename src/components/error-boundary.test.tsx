import { screen } from '@/__tests__/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderWithFileRoutes } from '@/__tests__/file-route-utils';
import { Header } from '@/components/header';

describe('Error boundary component ', () => {
  let consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should display error info on button click ', async () => {
    const { user } = renderWithFileRoutes(<Header />);

    const button = await screen.findByRole('button', { name: 'Error Button' });

    await user.click(button);

    expect(consoleSpy).toHaveBeenCalled();
  });
});
