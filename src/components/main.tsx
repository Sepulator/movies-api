import { Modal } from './modal';
import { ReactHookForm } from './react-hook-form';
import { useShowModal, useToggleModal } from '@/store/selectors';
import { modalFormComponents, modalFormDescriptions } from '@/consts';

export function Main() {
  const showModal = useShowModal();
  const toggleModal = useToggleModal();

  const isShowModal = showModal != 'none';
  const ActiveComponent = modalFormComponents[showModal];

  return (
    <main id="article">
      <ReactHookForm />
      <Modal title={modalFormDescriptions[showModal]} showModal={isShowModal} callback={() => toggleModal('none')}>
        {ActiveComponent && <ActiveComponent />}
      </Modal>
    </main>
  );
}
