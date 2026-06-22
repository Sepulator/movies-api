import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <section>
      <article>
        <h1>{t('404')}</h1>
        <p>{t('page')}</p>
        <Link href="/">{t('go')}</Link>
      </article>
    </section>
  );
}
