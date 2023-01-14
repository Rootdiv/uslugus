import { API_URL, directions } from './const';
import { categoryRus } from './categoryRus';
import { formatCurrency } from './formatCurrency';
import { createStars } from './createStars';

export const personCard = ({ avatar, category, comments, direction, name, surname, price, phone, email }) => {
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

  const serviceContacts = document.createElement('div');
  serviceContacts.className = 'service__contacts';

  const servicePhone = document.createElement('a');
  servicePhone.className = 'service__link service__link_phone';
  servicePhone.href = `tel:${phone}`;
  servicePhone.textContent = phone;

  const serviceEmail = document.createElement('a');
  serviceEmail.className = 'service__link service__link_email';
  serviceEmail.href = `mailto:${email}`;
  serviceEmail.textContent = email;

  serviceContacts.append(servicePhone, serviceEmail);

  const serviceReview = document.createElement('div');
  serviceReview.className = 'service__review';

  const serviceCountReview = document.createElement('p');
  serviceCountReview.className = 'service__count-review';
  serviceCountReview.textContent = comments.length;

  const serviceStars = createStars(comments);
  serviceStars.classList.add('service__stars');
  serviceReview.append(serviceStars, serviceCountReview);

  const personService = [serviceAvatar, servicePresent, servicePrice, serviceContacts, serviceReview];
  return personService;
};
