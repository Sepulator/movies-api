import { render, screen } from '@/__tests__/test-utils';
import { describe, expect, it } from 'vitest';
import { Card } from './card';
import { mockMovie } from '@/__tests__/mocks';

describe('Card component ', () => {
  it('should display title and image alt text', () => {
    render(<Card movie={mockMovie} />);

    expect(screen.getByText(mockMovie.Title)).toBeInTheDocument();
    expect(screen.getByAltText(mockMovie.Title)).toHaveAttribute('src');
  });
});
