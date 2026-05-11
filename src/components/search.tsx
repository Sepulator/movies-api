import { useRef, useState, type ChangeEvent, type SubmitEvent } from 'react';
import cs from './search.module.css';

interface Props {
  placeholder?: string;
  initialValue?: string;
  onSearch: (value: string) => void;
}

export function Search({ placeholder, initialValue, onSearch }: Props) {
  const [query, setQuery] = useState(initialValue || '');
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  if (ref.current) {
    ref.current.focus();
  }

  return (
    <form onSubmit={handleSubmit} className={cs.form}>
      <input
        ref={ref}
        type="search"
        name="search"
        aria-label={placeholder}
        value={query}
        placeholder={placeholder || ''}
        className={cs.input}
        onChange={handleChange}
      />
      <button type="submit" className={cs.button}>
        Search
      </button>
    </form>
  );
}
