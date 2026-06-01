import { useTheme } from '@/hooks/useTheme';
import { useToggleModal } from '@/store/selectors';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const toggleModal = useToggleModal();

  return (
    <header className="container">
      <nav>
        <ul>
          <li>
            <h1>Forms</h1>
          </li>
        </ul>
      </nav>

      <nav>
        <ul>
          <li>
            <button type="button" onClick={() => toggleModal('uncontolled')}>
              Uncontrolled
            </button>
          </li>
          <li>
            <button type="button" onClick={() => toggleModal('contolled')}>
              React Hook Form
            </button>
          </li>
          <li>
            <button type="button" onClick={toggleTheme} className="secondary">
              <svg role="presentation" aria-hidden="true" className="theme-icon">
                {theme === 'dark' ? <use href="/icons.svg#sun"></use> : <use href="/icons.svg#moon"></use>}
              </svg>
              {' Theme '}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
