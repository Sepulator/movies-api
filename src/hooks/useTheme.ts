import { use } from 'react';
import { ThemeContext } from '@/context/theme-context';

export function useTheme() {
  const context = use(ThemeContext);

  if (context === undefined) {
    throw new Error('Theme Provider missed');
  }

  return context;
}
