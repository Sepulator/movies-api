import { useShowModal, useToggleModal } from '@/store/selectors';
import { Modal } from './modal';
import { modalFormDescriptions } from '@/consts';

export function Main() {
  const showModal = useShowModal();
  const toggleModal = useToggleModal();

  const isShowModal = showModal != 'none';

  return (
    <main id="article">
      <Modal title={modalFormDescriptions[showModal]} showModal={isShowModal} callback={() => toggleModal('none')}>
        <p>Hello</p>
      </Modal>
    </main>
  );
}
