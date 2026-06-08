import cs from './footer.module.css';

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={cs.nav}>
      <a className={cs.icon} href="https://github.com/Sepulator" target="_blank" rel="noreferrer">
        <svg id={cs.github} className="icon" role="presentation" aria-hidden="true">
          <use href="/icons.svg#github-icon"></use>
        </svg>
      </a>
      <span>{currentYear + '©️'}</span>
      <a className={cs.icon} href="https://rs.school/" target="_blank" rel="noreferrer">
        <svg role="presentation" aria-hidden="true">
          <use href="/icons.svg#rss-icon"></use>
        </svg>
      </a>
    </footer>
  );
}
