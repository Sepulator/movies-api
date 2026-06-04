import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UncontrolledForm } from './uncontrolled-form';
import { render, screen, waitFor } from '@/__tests__/test-utils';
import * as storeSelectors from '../store/selectors';

vi.mock('../store/selectors', () => ({
  useCountries: vi.fn(() => ['Haiti', 'Fiji']),
  useAddItem: vi.fn(),
  useToggleModal: vi.fn(),
}));

vi.mock('../services/form-schema', async () => {
  const actual = await vi.importActual<typeof import('../services/form-schema')>('../services/form-schema');
  return {
    ...actual,
    formSchemaUncontrolled: {
      ...actual.formSchemaUncontrolled,
      safeParse: vi.fn().mockImplementation((data: unknown) => {
        const { image, ...rest } = data as Record<string, unknown>;
        return actual.formSchemaUncontrolled.safeParse({
          ...rest,
          image: new File(['hello'], 'hello.png', { type: 'image/png' }),
        });
      }),
    },
  };
});

describe('ReactHookForm Component', () => {
  const mockAddItem = vi.fn();
  const mockToggleModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(storeSelectors.useAddItem).mockReturnValue(mockAddItem);
    vi.mocked(storeSelectors.useToggleModal).mockReturnValue(mockToggleModal);
  });

  it('renders all form fields correctly', () => {
    render(<UncontrolledForm />);

    expect(screen.getByLabelText(/^Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Age:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Male$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Profile Image:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty/invalid fields after submit button pressed', async () => {
    const { user } = render(<UncontrolledForm />);

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeEnabled();
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });

  it('submits the form when valid data is provided', async () => {
    const { user } = render(<UncontrolledForm />);

    await user.type(screen.getByLabelText(/^Name:/i), 'John Doe');
    await user.type(screen.getByLabelText(/^Age:/i), '30');
    await user.type(screen.getByLabelText(/^Email:/i), 'john@example.com');
    await user.click(screen.getByLabelText(/^Male$/i));
    await user.click(screen.getByLabelText(/I accept the Terms and Conditions/i));

    const countryInput = screen.getByPlaceholderText(/Select or type country/i);
    await user.type(countryInput, 'Haiti');
    await user.type(screen.getByLabelText(/^Password:/i), 'Password123!');
    await user.type(screen.getByLabelText(/^Confirm Password:/i), 'Password123!');

    const submitButton = screen.getByRole('button', { name: /Submit/i });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockAddItem).toHaveBeenCalled();
      expect(mockToggleModal).toHaveBeenCalledWith('none');
    });
  });
});
