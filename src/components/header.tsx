import { useTheme } from '@/hooks/useTheme';
import { useToggleModal } from '@/store/selectors';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const toggleModal = useToggleModal();

  return (
    <header>
      <a href="/">
        <h1>Forms</h1>
      </a>
      <button type="button" onClick={() => toggleModal('uncontolled')}>
        Uncontrolled
      </button>
      <button type="button" onClick={() => toggleModal('contolled')}>
        React Hook Form
      </button>

      <button type="button" onClick={toggleTheme}>
        <svg role="presentation" aria-hidden="true" className="theme-icon">
          {theme === 'dark' ? <use href="/icons.svg#sun"></use> : <use href="/icons.svg#moon"></use>}
        </svg>
        {' Theme '}
      </button>
    </header>
  );
}
