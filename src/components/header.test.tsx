import { render, screen } from '@/__tests__/test-utils';
import { describe, it, expect } from 'vitest';
import { Header } from './header';
import { ThemeProvider } from './theme-provider';

describe('Header Component', () => {
  it('should render navigation links', async () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    expect(await screen.findByRole('link', { name: /Forms/i })).toBeInTheDocument();
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
});
