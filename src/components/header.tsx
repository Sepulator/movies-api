import { useTheme } from '@/hooks/useTheme';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <a href="/">
        <h1>Forms</h1>
      </a>

      <div>
        <button type="button" onClick={toggleTheme}>
          <svg role="presentation" aria-hidden="true" className="theme-icon">
            {theme === 'dark' ? <use href="/icons.svg#sun"></use> : <use href="/icons.svg#moon"></use>}
          </svg>
          {' Theme '}
        </button>
      </div>
    </header>
  );
}
