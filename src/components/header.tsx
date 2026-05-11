import { useState } from 'react';

export function Header() {
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('Error boundary tested!');
  }

  return (
    <header>
      <a href="/">
        <h1>Movie API</h1>
      </a>
      <button type="button" secondary="true" onClick={handleClick}>
        Error Button
      </button>
    </header>
  );
}
