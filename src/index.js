import './index.html';
import './index.sass';
import { choicesController } from './modules/choicesController';
import { modalController } from './modules/modalController';
import { selectController } from './modules/selectController';
import { showPassword } from './modules/showPassword';

const init = () => {
  modalController({
    modal: '.modal_sign-in',
    btnOpen: '.header__auth-btn_sign-in',
    btnClose: '.modal__close',
  });

  modalController({
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
    handlerOpenModal: async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => response.json());
      const comments = document.querySelectorAll('.review__text');
      comments.forEach(comment => {
        //Проверяем срытую высоту комментария
        if (comment.scrollHeight > 38 && !comment.nextElementSibling?.contains('review__open')) {
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

      console.log('data: ', data);
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
      console.log('value: ', value);
    },
  });

  showPassword();
  choicesController();
};

init();
