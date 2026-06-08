import { Card } from './card';
import { Modal } from './modal';
import { modalFormComponents, modalFormDescriptions } from '@/configs/modal-config';
import { useItems, useShowModal, useToggleModal } from '@/store/selectors';

export function Main() {
  const showModal = useShowModal();
  const toggleModal = useToggleModal();
  const items = useItems();

  const isShowModal = showModal != 'none';
  const ActiveComponent = modalFormComponents[showModal];

  return (
    <main>
      <Modal title={modalFormDescriptions[showModal]} showModal={isShowModal} callback={() => toggleModal('none')}>
        {ActiveComponent && <ActiveComponent />}
      </Modal>
      <section className="gallery">
        {items.map((item, index) => (
          <Card key={item.id} {...item} className={index === 0 ? 'last-item' : ''} />
        ))}
      </section>
    </main>
  );
}
