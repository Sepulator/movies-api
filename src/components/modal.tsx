import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  title: string;
  showModal: boolean;
  callback: () => void;
}

export function Modal({ children, title, showModal, callback }: Props) {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const dialog = ref.current;

    if (showModal) {
      ref.current.showModal();
    }

    dialog.addEventListener('close', callback);

    return () => dialog.removeEventListener('close', callback);
  }, [showModal, callback]);

  return (
    <>
      {showModal &&
        createPortal(
          <dialog ref={ref} id="forms-modal" aria-label="Forms modal window">
            <header>
              <h3>{title}</h3>
            </header>
            {children}
            <form method="dialog">
              <button type="submit">Close</button>
            </form>
          </dialog>,
          document.body
        )}
    </>
  );
}
