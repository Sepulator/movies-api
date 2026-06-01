import { useState } from 'react';
import { Link } from '@tanstack/react-router';

import { useTheme } from '@/hooks/useTheme';
import type { MovieSearch } from '@/models/interfaces';
import { queryClient } from '@/services/query-client';

export function Header() {
  const [isError, setIsError] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleError = () => {
    setIsError(true);
  };

  const handleInvalidate = async () => await queryClient.invalidateQueries();

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
      <div>
        <input type="reset" value="Invalidate" onClick={() => void handleInvalidate()} />
        <button type="button" secondary="true" onClick={handleError}>
          Error
        </button>

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
