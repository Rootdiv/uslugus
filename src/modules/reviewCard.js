import { createStars } from './createStars';

export const reviewCard = comments => {
  const reviewList = document.createElement('ul');
  reviewList.className = 'review__list';

  comments.forEach(({ name, stars, text }) => {
    const reviewItem = document.createElement('li');
    reviewItem.className = 'review__item';

    const reviewName = document.createElement('p');
    reviewName.className = 'review__name';
    reviewName.textContent = name;

    const reviewStars = createStars(stars);
    reviewStars.classList.add('review__stars');

    const reviewText = document.createElement('p');
    reviewText.className = 'review__text';
    reviewText.textContent = text;

    reviewItem.append(reviewName, reviewStars, reviewText);
    reviewList.append(reviewItem);
  });

  return reviewList;
};
