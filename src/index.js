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
import { personCard } from './modules/personCard';
import { reviewCard } from './modules/reviewCard';

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

  //const modalPerson = modalController({
  modalController({
    modal: '.modal_person',
    btnOpen: '.service',
    parentBtn: '.services__list',
    btnClose: '.modal__close',
    handlerOpenModal: async ({ handler, modalElem }) => {
      const data = await getData(`${API_URL}/api/service/${handler.dataset.id}`);
      const personService = modalElem.querySelector('.person__service');
      personService.textContent = '';
      personService.dataset.id = data.id;
      personService.append(...personCard(data));
      const aboutText = modalElem.querySelector('.about__text');
      aboutText.textContent = data.about;

      const review = modalElem.querySelector('.person__review');
      review.textContent = '';
      const title = document.createElement('h3');
      title.className = 'review__title';
      title.textContent = 'Отзывы';
      review.append(title);

      if (data.comments.length) {
        review.append(reviewCard(data.comments));

        if (data.comments.length > 3) {
          const btn = document.createElement('button');
          btn.className = 'review__open review__open_list';
          btn.textContent = 'Все отзывы';
          review.append(btn);

          btn.addEventListener('click', () => {
            review.classList.add('review_show-all');
            btn.remove();
          });
        }
      } else {
        const noReview = document.createElement('p');
        noReview.textContent = 'Отзывов пока нет';
        review.append(noReview);
      }

      const comments = document.querySelectorAll('.review__text');
      comments.forEach(comment => {
        //Проверяем срытую высоту комментария
        if (comment.scrollHeight > 38) {
          const button = document.createElement('button');
          button.classList.add('review__open');
          button.textContent = 'Развернуть';
          comment.after(button); //Вставляем кнопку после комментария

          button.addEventListener('click', () => {
            comment.classList.toggle('review__text_open');
            button.textContent = comment.classList.contains('review__text_open') ? 'Свернуть' : 'Развернуть';
          });
        }
      });
    },
  });

  // modalPerson.onOpenModal(() => {
  //   console.log('Привет друзья!');
  // });

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
