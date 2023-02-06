import { API_URL } from './const';
import { getData } from './getData';
import { createCard } from './createCard';
import { startPagination } from './pagination';

export const renderList = async (url = `${API_URL}/api/service`, category = '') => {
  const paginationWrapper = document.querySelector('.pagination');
  const servicesList = document.querySelector('.services__list');
  servicesList.textContent = '';

  const urlParams = new URL(location);
  for (const [name, value] of urlParams.searchParams.entries()) {
    urlParams.searchParams.set(name, value);
  }
  if (category) {
    urlParams.searchParams.set('page', 1);
    urlParams.searchParams.set('category', category);
  }
  history.pushState(null, null, urlParams);

  const data = await getData(`${url}${urlParams.search}`);
  const cards = data.items.map(createCard);
  if (cards.length > 0) {
    servicesList.append(...cards);
    startPagination(paginationWrapper, data.pages, data.page);
  } else {
    servicesList.insertAdjacentHTML('afterbegin', '<li class="services__item_not-found">Специалистов не найдено</li>');
    paginationWrapper.textContent = '';
  }
};
