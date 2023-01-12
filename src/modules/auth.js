import { API_URL } from './const';
import { store } from './store';
import { categoryRus } from './categoryRus';

export const auth = data => {
  store.user.id = data.id;
  store.user.name = data.name;
  store.user.avatar = data.avatar;
  store.user.category = data.category;

  localStorage.setItem('uslugus', JSON.stringify(store.user));
};

export const createUserBlock = ({ id, avatar, name, category }) => {
  const headerAuth = document.querySelector('.header__auth');
  headerAuth.textContent = '';

  const userBlock = document.createElement('div');
  userBlock.className = 'user';

  const buttonUserAvatar = document.createElement('button');
  buttonUserAvatar.className = 'user__avatar';

  const userAvatar = document.createElement('img');
  userAvatar.src = `${API_URL}/${avatar}`;
  userAvatar.alt = `${categoryRus(category)} ${name}`;

  buttonUserAvatar.append(userAvatar);

  const userWrapper = document.createElement('div');
  userWrapper.className = 'user__wrapper';

  const userInfo = document.createElement('div');
  userInfo.className = 'user__info';

  const userName = document.createElement('div');
  userName.className = 'user__name';
  userName.textContent = name;

  const userCategory = document.createElement('div');
  userCategory.className = 'user__category';
  userCategory.textContent = categoryRus(category);

  userInfo.append(userName, userCategory);

  const userEdit = document.createElement('button');
  userEdit.className = 'user__edit';
  userEdit.dataset.id = id;
  userEdit.textContent = 'Изменить услугу';

  userWrapper.append(userInfo, userEdit);

  userBlock.append(buttonUserAvatar, userWrapper);

  headerAuth.append(userBlock);

  userAvatar.addEventListener('click', () => {
    userBlock.classList.toggle('user_open');
    userWrapper.classList.toggle('user__wrapper_open');
  });
};
