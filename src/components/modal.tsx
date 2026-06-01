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

  function closeOnBackDropClick({ currentTarget, target }: React.MouseEvent<HTMLDialogElement>) {
    const dialog = currentTarget;
    const isClickedOnBackDrop = target === dialog;
    if (isClickedOnBackDrop) {
      dialog.close();
    }
  }

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
          <dialog ref={ref} className="dialog" aria-label="Forms modal window" onClick={closeOnBackDropClick}>
            <article className="dialog-wrapper">
              <header>
                <h3>{title}</h3>
              </header>
              {children}
              <form method="dialog">
                <button type="submit">Close</button>
              </form>
            </article>
          </dialog>,
          document.body
        )}
    </>
  );
}
