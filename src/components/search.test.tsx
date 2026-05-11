import { render, screen } from '@/__tests__/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Search } from './search';

describe('Search component ', () => {
  const handleSearch = vi.fn();
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
  const placeholder = 'Search...';
  const searchTerm = 'Terminator';

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should display search input and search button', () => {
    render(<Search onSearch={handleSearch} placeholder={placeholder} />);

    expect(screen.getByRole('searchbox', { name: placeholder })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should display empty search input and correct placeholder', () => {
    render(<Search onSearch={handleSearch} placeholder={placeholder} />);

    expect(screen.getByRole('searchbox', { name: placeholder })).toHaveValue('');
    expect(screen.getByPlaceholderText(placeholder)).toBeVisible();
  });

  it('should focus input on component mount', () => {
    render(<Search onSearch={handleSearch} placeholder={placeholder} />);

    expect(screen.getByRole('searchbox', { name: placeholder })).toHaveFocus();
  });

  it('should display previously saved search term on mount', () => {
    render(<Search onSearch={handleSearch} placeholder={placeholder} initialValue={searchTerm} />);

    expect(screen.getByRole('searchbox', { name: placeholder })).toHaveValue(searchTerm);
    expect(screen.getByPlaceholderText(placeholder)).toBeVisible();
  });

  it('should save trimmed value to localstorage', async () => {
    const { user } = render(<Search onSearch={handleSearch} placeholder={placeholder} />);

    const input = screen.getByRole('searchbox', { name: placeholder });
    const button = screen.getByRole('button');

    await user.type(input, `  ${searchTerm}  `);
    await user.click(button);

    expect(input).toHaveValue(`  ${searchTerm}  `);
    expect(handleSearch).toHaveBeenCalledWith(searchTerm);
    expect(setItemSpy).toHaveBeenCalledWith('query', searchTerm);
  });
});
