import { API_URL } from './const';
import { store } from './store';
import { categoryRus } from './categoryRus';
import { modalController } from './modalController';
import { getData } from './getData';

export const createUserBlock = ({ id, avatar, name, category }) => {
  const headerAuth = document.querySelector('.header__auth');
  headerAuth.textContent = '';

  const userBlock = document.createElement('div');
  userBlock.className = 'auth';

  const buttonUserAvatar = document.createElement('button');
  buttonUserAvatar.className = 'auth__avatar';

  const userAvatar = document.createElement('img');
  userAvatar.src = `${API_URL}/${avatar}`;
  userAvatar.alt = `${categoryRus(category)} ${name}`;

  buttonUserAvatar.append(userAvatar);

  const userWrapper = document.createElement('div');
  userWrapper.className = 'auth__wrapper';

  const userInfo = document.createElement('div');
  userInfo.className = 'auth__info';

  const userName = document.createElement('div');
  userName.className = 'auth__name';
  userName.textContent = name;

  const userCategory = document.createElement('div');
  userCategory.className = 'auth__category';
  userCategory.textContent = categoryRus(category);

  userInfo.append(userName, userCategory);

  const userEdit = document.createElement('button');
  userEdit.className = 'auth__btn-edit';
  userEdit.dataset.id = id;
  userEdit.textContent = 'Изменить услугу';

  userWrapper.append(userInfo, userEdit);

  userBlock.append(buttonUserAvatar, userWrapper);

  headerAuth.append(userBlock);

  userAvatar.addEventListener('click', () => {
    userBlock.classList.toggle('auth_open');
    userWrapper.classList.toggle('auth__wrapper_open');
  });

  modalController({
    modal: '.modal_sign-up',
    btnOpen: '.auth__btn-edit',
    btnClose: '.modal__close',
    handlerOpenModal: async () => {
      const form = document.querySelector('.form_sign-up');
      const url = `${API_URL}/api/service/${id}`;
      const data = await getData(url);

      form.action = url;
      form.dataset.method = 'PATCH';
      form.name.value = data.name;
      form.surname.value = data.surname;
      form.phone.value = data.phone;
      form.email.value = data.email;
      form.price.value = data.price;
      form.about.value = data.about;
      form.direction._choices.setChoiceByValue(data.direction);
      form.category._choices.setChoiceByValue(data.category);
    },
  });
};

export const auth = data => {
  store.user.id = data.id;
  store.user.name = data.name;
  store.user.avatar = data.avatar;
  store.user.category = data.category;

  createUserBlock(store.user);
  localStorage.setItem('uslugus', JSON.stringify(store.user));
};
