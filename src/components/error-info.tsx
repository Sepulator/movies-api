interface Props {
  err: Error;
  reset: () => void;
}

export function ErrorInfo({ err, reset }: Props) {
  return (
    <>
      <main style={{ paddingTop: '4rem' }}>
        <h2>Something went wrong!</h2>
        <article style={{ border: '1px solid red' }}>
          <p style={{ color: 'red' }}>{err.message}</p>
          <footer>
            <button type="button" onClick={reset}>
              Reset UI
            </button>
          </footer>
        </article>
      </main>
    </>
  );
}
