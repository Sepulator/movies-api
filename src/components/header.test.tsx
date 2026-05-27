import { render, screen } from '@/__tests__/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './header';
import { ThemeProvider } from './theme-provider';

describe('Header Component', () => {
  it('should render navigation links', async () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    expect(await screen.findByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: /About/i })).toBeInTheDocument();
  });

  it('should toggle theme when button is clicked', async () => {
    const { user } = render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const themeBtn = await screen.findByRole('button', { name: /Theme/i });

    expect(themeBtn.querySelector('use')?.getAttribute('href')).toBe('/icons.svg#sun');

    await user.click(themeBtn);

    expect(themeBtn.querySelector('use')?.getAttribute('href')).toBe('/icons.svg#moon');
  });

  it('should trigger ErrorBoundary when Error Button is clicked', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { user } = render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const errorBtn = await screen.findByRole('button', { name: /Error/i });
    await user.click(errorBtn);

    expect(screen.getByText(/Error boundary tested!/i)).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
