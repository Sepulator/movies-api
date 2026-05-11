import { render, screen } from '@/__tests__/test-utils';
import { describe, expect, it } from 'vitest';
import { CardList } from './card-list';
import { mockNoResult, mockResult } from '@/__tests__/mocks';

describe('Card list component', () => {
  it('should display all titles and images', () => {
    render(<CardList data={mockResult} loading={false} />);

    expect(screen.getByText(mockResult.Search[0].Title)).toBeInTheDocument();
    expect(screen.getByAltText(mockResult.Search[0].Title)).toHaveAttribute('src');

    expect(screen.getByText(mockResult.Search[1].Title)).toBeInTheDocument();
    expect(screen.getByAltText(mockResult.Search[1].Title)).toHaveAttribute('src');
  });

  it('should renders correct numbers of movies', () => {
    render(<CardList data={mockResult} loading={false} />);

    expect(screen.getAllByRole('article')).toHaveLength(mockResult.Search.length);
  });

  it('should display error in case of no results', () => {
    render(<CardList data={mockNoResult} loading={false} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(mockNoResult.Error);
  });

  it('should display spinner while fetching data', () => {
    render(<CardList data={mockResult} loading={true} />);

    expect(screen.getByRole('alert', { busy: true })).toBeInTheDocument();
  });
});
