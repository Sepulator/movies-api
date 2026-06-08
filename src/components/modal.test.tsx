import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { Modal } from './modal';
import { render, screen, fireEvent } from '@/__tests__/test-utils';

describe('Modal Component', () => {
  const mockCallback = vi.fn();
  const closeMock = vi.fn();
  const showModalMock = vi.fn();

  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = showModalMock;
    HTMLDialogElement.prototype.close = closeMock;
    mockCallback.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly when showModal is true', () => {
    const { container } = render(
      <Modal title="Test Modal" showModal={true} callback={mockCallback}>
        <p>Modal Content</p>
      </Modal>
    );

    const dialog = screen.getByLabelText('Forms modal window');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();

    expect(dialog.parentElement).toBe(document.body);
    expect(container).not.toContainElement(dialog);
  });

  it('does not render when showModal is false', () => {
    render(
      <Modal title="Test Modal" showModal={false} callback={mockCallback}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.queryByLabelText('Forms modal window')).not.toBeInTheDocument();
  });

  it('calls showModal when showModal prop is true', () => {
    render(
      <Modal title="Test Modal" showModal={true} callback={mockCallback}>
        <p>Modal Content</p>
      </Modal>
    );

    expect(showModalMock).toHaveBeenCalled();
  });

  it('calls callback when background is clicked', async () => {
    const { user } = render(
      <Modal title="Test Modal" showModal={true} callback={mockCallback}>
        <p>Modal Content</p>
      </Modal>
    );

    const dialog = screen.getByLabelText('Forms modal window');

    await user.click(dialog);

    expect(closeMock).toHaveBeenCalled();

    fireEvent(dialog, new Event('close'));
    expect(mockCallback).toHaveBeenCalled();
  });
});
