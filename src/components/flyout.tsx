import { useMovies, useResetMovies } from '@/store/selectors';
import { getDownloadURL } from '@/utils/generate-link-csv';

export function Flyout() {
  const movies = useMovies();
  const resetMovies = useResetMovies();

  const handleDownload = () => {
    const url = getDownloadURL(movies);
    const link = document.createElement('a');

    link.href = url;
    link.download = `movies-${movies.length}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flyout-track">
      <aside role="navigation" id="flyout">
        <p>Selected movies: {movies.length}</p>
        <div>
          <button type="button" onClick={resetMovies}>
            Unselect
          </button>
          <button type="button" onClick={handleDownload}>
            Download
          </button>
        </div>
      </aside>
    </div>
  );
}
