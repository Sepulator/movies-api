import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  return (
    <section>
      <h2 style={{ textAlign: 'center' }}>About</h2>
      <article className="about">
        <img src="/poster.jpg" alt="Poster" className="about-img" />
        <p>
          <h3>The Movies API is a RESTful web service to obtain movie information</h3>
          <ul>
            <li>
              <a href="https://rs.school/courses/reactjs" target="_blank" rel="noreferrer">
                RS School React course
              </a>
            </li>
            <li>
              <a href="https://github.com/Sepulator" target="_blank" rel="noreferrer">
                author Yuri S.
              </a>
            </li>
            <li>
              api used - <a href="https://www.omdbapi.com/">The Open Movie Database</a>
            </li>
          </ul>
        </p>
      </article>
    </section>
  );
}
