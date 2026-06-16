'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { useQueryClient } from '@tanstack/react-query';

export function Header() {
  const [isError, setIsError] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleError = () => {
    setIsError(true);
  };

  const handleInvalidate = void useQueryClient().invalidateQueries();

  if (isError) {
    throw new Error('Error boundary tested!');
  }

  return (
    <header>
      <Link href="/">
        <h1>Movie API</h1>
      </Link>

      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <div>
        <input type="reset" value="Invalidate" onClick={handleInvalidate} />
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
