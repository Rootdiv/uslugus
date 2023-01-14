import { clearFormError } from './clearFormError';

export const modalController = ({
  modal,
  btnOpen,
  btnClose,
  parentBtn,
  time = 300,
  handlerOpenModal = () => {},
  handlerCloseModal = () => {},
}) => {
  const handlerElems = parentBtn ? document.querySelector(parentBtn) : document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  const dataModal = {
    handlerOpenModal,
    handlerCloseModal,
    onOpenModal(handlerOpenModal) {
      dataModal.handlerOpenModal = handlerOpenModal;
    },
    onCloseModal(handlerCloseModal) {
      dataModal.handlerCloseModal = handlerCloseModal;
    },

    closeModal: event => {
      const target = event.target;

      if (
        target === modalElem ||
        (btnClose && target.closest(btnClose)) ||
        event.code === 'Escape' ||
        event.type === 'submit'
      ) {
        modalElem.style.opacity = 0;

        setTimeout(() => {
          modalElem.style.visibility = 'hidden';
          dataModal.handlerCloseModal({ modalElem });
        }, time);

        window.removeEventListener('keydown', dataModal.closeModal);
      }
    },
    openModal: async handler => {
      await dataModal.handlerOpenModal({ handler, modalElem, closeModal: dataModal.closeModal });
      modalElem.style.visibility = 'visible';
      modalElem.style.opacity = 1;
      window.addEventListener('keydown', dataModal.closeModal);
      clearFormError(modalElem.querySelector('form'));
    },
  };

  if (parentBtn) {
    handlerElems.addEventListener('click', ({ target }) => {
      const handler = target.closest(btnOpen);
      if (handler) {
        dataModal.openModal(handler);
      }
    });
  } else {
    handlerElems.forEach(btn => {
      btn.addEventListener('click', dataModal.openModal);
    });
  }

  modalElem.addEventListener('click', dataModal.closeModal);

  return dataModal;
};
