'use client';

interface Props {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function Error({ error, unstable_retry }: Props) {
  return (
    <html>
      <body>
        <main style={{ paddingTop: '4rem' }}>
          <h2>Something went wrong!</h2>
          <article style={{ border: '1px solid red' }}>
            <p style={{ color: 'red' }}>{error.message}</p>
            <footer>
              <button type="button" onClick={() => unstable_retry()}>
                Reset UI
              </button>
            </footer>
          </article>
        </main>
      </body>
    </html>
  );
}
