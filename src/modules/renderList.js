import { API_URL } from './const';
import { getData } from './getData';
import { createCard } from './createCard';

export const renderList = async (url = `${API_URL}/api/service`, category = '') => {
  const servicesList = document.querySelector('.services__list');
  servicesList.textContent = '';

  const data = await getData(url);
  setTimeout(() => {
    const renderData = category ? data.filter(item => item.category === category) : data;
    const cards = renderData.map(createCard);
    if (cards.length > 0) {
      servicesList.append(...cards);
    } else {
      servicesList.insertAdjacentHTML(
        'afterbegin',
        '<li class="services__item_not-found">Специалистов не найдено</li>',
      );
    }
  }, 500);
};
