import { personCard } from './personCard';
import { reviewCard } from './reviewCard';
import { sendComment } from './sendComment';

export const modalPerson = (data, modalElem, closeModal) => {
  const personService = modalElem.querySelector('.person__service');
  personService.textContent = '';
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

  const formReview = modalElem.querySelector('.form_review-add');
  formReview.dataset.id = data.id;
  sendComment(formReview, closeModal);
};
