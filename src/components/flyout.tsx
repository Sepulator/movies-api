'use client';

import { useMovies, useResetMovies } from '@/store/selectors';
import { generateCsvAction } from '@/app/actions/csv-actions';
import { useTranslations } from 'next-intl';

export function Flyout() {
  const movies = useMovies();
  const resetMovies = useResetMovies();
  const t = useTranslations('Flyout');

  const handleDownload = async () => {
    const csvContent = await generateCsvAction(movies);
    const blob = new Blob([csvContent], { type: 'text/csv; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `movies-${movies.length}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  if (!movies.length) return null;

  return (
    <div className="flyout-track">
      <aside role="navigation" id="flyout">
        <p>{t('selected', { count: movies.length })}</p>
        <div>
          <button type="button" onClick={resetMovies}>
            {t('unselect')}
          </button>
          <button type="button" onClick={() => void handleDownload()}>
            {t('download')}
          </button>
        </div>
      </aside>
    </div>
  );
}
