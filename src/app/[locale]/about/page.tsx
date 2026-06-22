import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function About() {
  const t = await getTranslations('About');

  return (
    <section>
      <h2 style={{ textAlign: 'center' }}>{t('title')}</h2>
      <article className="about">
        <Image src="/poster.jpg" alt="Poster" width={170} height={250} loading="eager" />

        <div>
          <h3>{t('info')}</h3>

          <ul>
            <li>
              <a href="https://rs.school/courses/reactjs" target="_blank" rel="noreferrer">
                {t('course')}
              </a>
            </li>
            <li>
              <a href="https://github.com/Sepulator" target="_blank" rel="noreferrer">
                {t('author')}
              </a>
            </li>
            <li>
              {t('api')} <a href="https://www.omdbapi.com/">The Open Movie Database</a>
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
}
