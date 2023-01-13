import starSVG from '../img/star.svg';
import starEmptySVG from '../img/star-empty.svg';

export const reviewCard = ({ name, stars, text }) => {
  const reviewItem = document.createElement('li');
  reviewItem.className = 'review__item';

  const reviewName = document.createElement('p');
  reviewName.className = 'review__name';
  reviewName.textContent = name;

  const reviewStars = document.createElement('div');
  reviewStars.className = 'review__stars stars';

  for (let i = 0; i < 5; i++) {
    const star = document.createElement('img');
    star.className = 'stars__item';

    if (i === 0) {
      star.alt = `Рейтинг специалиста ${stars} из 5`;
    } else {
      star.alt = '';
    }

    if (stars > i) {
      star.src = starSVG;
    } else {
      star.src = starEmptySVG;
    }

    reviewStars.append(star);
  }

  const reviewText = document.createElement('p');
  reviewText.className = 'review__text';
  reviewText.textContent = text;

  reviewItem.append(reviewName, reviewStars, reviewText);
  return reviewItem;
};
