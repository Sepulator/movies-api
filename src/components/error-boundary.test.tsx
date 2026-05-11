import { render, screen } from '@/__tests__/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './app';

describe('Error boundary component ', () => {
  let consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should display error info on button click ', async () => {
    const { user } = render(<App />);

    const button = screen.getByRole('button', { name: 'Error Button' });

    await user.click(button);

    expect(consoleSpy).toHaveBeenCalled();
  });
});
