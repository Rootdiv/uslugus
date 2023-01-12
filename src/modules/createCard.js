import { API_URL, directions } from './const';
import { categoryRus } from './categoryRus';
import { formatCurrency } from './formatCurrency';
import { createStars } from './createStars';

export const createCard = ({ avatar, category, comments, direction, id, name, surname, price }) => {
  const serviceItem = document.createElement('li');
  serviceItem.className = 'services__item';

  const service = document.createElement('article');
  service.className = 'service';
  service.dataset.id = id;
  serviceItem.append(service);

  const serviceAvatar = new Image(50, 50);
  serviceAvatar.className = 'service__avatar';
  serviceAvatar.src = `${API_URL}/${avatar}`;
  serviceAvatar.alt = `${categoryRus(category)} ${surname} ${name}`;

  const servicePresent = document.createElement('div');
  servicePresent.className = 'service__present';

  const serviceTitle = document.createElement('h3');
  serviceTitle.className = 'service__title';
  serviceTitle.textContent = categoryRus(category);

  const serviceName = document.createElement('p');
  serviceName.className = 'service__name';
  serviceName.textContent = `${name} ${surname[0]}.`;
  servicePresent.append(serviceTitle, serviceName);

  const servicePrice = document.createElement('p');
  servicePrice.className = 'service__price';
  servicePrice.textContent = `${directions[direction]} ${formatCurrency(price)}`;

  const serviceReview = document.createElement('div');
  serviceReview.className = 'service__review';

  const serviceCountReview = document.createElement('p');
  serviceCountReview.className = 'service__count-review';
  serviceCountReview.textContent = comments.length;

  serviceReview.append(createStars(comments), serviceCountReview);
  service.append(serviceAvatar, servicePresent, servicePrice, serviceReview);
  return serviceItem;
};
