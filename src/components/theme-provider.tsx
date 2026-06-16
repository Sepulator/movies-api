'use client';

import { ThemeContext, type Theme } from '@/context/theme-context';
import { useState, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme: Theme = prevTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);

      return newTheme;
    });
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}
