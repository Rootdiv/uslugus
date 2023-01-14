import './index.html';
import './index.sass';

import { modalController } from './modules/modalController';
import { selectController } from './modules/selectController';
import { showPassword } from './modules/showPassword';
import { choicesController } from './modules/choicesController';
import { getCategory } from './modules/getCategory';
import { renderList } from './modules/renderList';
import { searchControl } from './modules/searchControl';
import { ratingController } from './modules/ratingController';
import { signInController, signUpController } from './modules/sign';
import { getData } from './modules/getData';
import { API_URL } from './modules/const';
import { createUserBlock } from './modules/auth';
import { modalPerson } from './modules/modalPerson';

const init = async () => {
  await getCategory();
  renderList();

  const eventModalSignIn = modalController({
    modal: '.modal_sign-in',
    btnOpen: '.header__auth-btn_sign-in',
    btnClose: '.modal__close',
  });

  const eventModalSignUp = modalController({
    modal: '.modal_sign-up',
    btnOpen: '.header__auth-btn_sign-up',
    btnClose: '.modal__close',
  });

  modalController({
    modal: '.modal_person',
    btnOpen: '.service',
    parentBtn: '.services__list',
    btnClose: '.modal__close',
    handlerOpenModal: async ({ handler, modalElem, closeModal }) => {
      const data = await getData(`${API_URL}/api/service/${handler.dataset.id}`);
      modalPerson(data, modalElem, closeModal);
    },
  });

  selectController({
    openBtn: '.category__title',
    openBlock: '.category__list',
    closeBlock: '.category__btn',
    handleChange: value => {
      renderList(undefined, value);
    },
  });

  showPassword();
  choicesController();

  searchControl();
  ratingController();

  signUpController(eventModalSignUp.closeModal);
  signInController(eventModalSignIn.closeModal);

  const userAuth = JSON.parse(localStorage.getItem('uslugus'));
  if (userAuth) {
    createUserBlock(userAuth);
  }
};

init();
