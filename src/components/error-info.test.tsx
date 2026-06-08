import { render, screen } from '@/__tests__/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { ErrorInfo } from './error-info';

describe('Error Info component', () => {
  const mockError = new Error('Test error message');
  const mockReset = vi.fn();

  it('should render the error message and a reset button', () => {
    render(<ErrorInfo err={mockError} reset={mockReset} />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText(mockError.message)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset UI' })).toBeInTheDocument();
  });

  it('should call the reset function when the button is clicked', async () => {
    const { user } = render(<ErrorInfo err={mockError} reset={mockReset} />);

    const resetButton = screen.getByRole('button', { name: 'Reset UI' });
    await user.click(resetButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
