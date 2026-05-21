import { useTheme } from '@/hooks/useTheme';
import type { MovieSearch } from '@/models/interfaces';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export function Header() {
  const [isError, setIsError] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('Error boundary tested!');
  }

  return (
    <header>
      <a href="/">
        <h1>Movie API</h1>
      </a>

      <Link to="/" search={(prev) => prev as MovieSearch}>
        Home
      </Link>
      <Link to="/about">About</Link>
      <button type="button" secondary="true" onClick={handleClick}>
        Error Button
      </button>
      <button type="button" onClick={toggleTheme}>
        <svg role="presentation" aria-hidden="true" className="theme-icon">
          {theme === 'dark' ? <use href="/icons.svg#sun"></use> : <use href="/icons.svg#moon"></use>}
        </svg>
        {' Toggle theme '}
      </button>
    </header>
  );
}
