import { auth } from './auth';
import { avatarController } from './avatarController';
import { API_URL } from './const';
import { createCard } from './createCard';
import { errorPassword } from './errorPasswords';
import { postData } from './postData';

export const signInController = callback => {
  const form = document.querySelector('.form_sign-in');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const dataResponse = await postData(`${API_URL}/api/service/signin`, data);

    if (dataResponse.message) {
      form.email.style.border = '1px solid #ff0000';
      errorPassword(form, 'Неверный логин или пароль');
      return;
    }

    auth(dataResponse);
    form.reset();
    callback(event);
  });
};

export const signUpController = callback => {
  const form = document.querySelector('.form_sign-up');
  form.action = `${API_URL}/api/service/signup`;

  const crp = avatarController({
    inputFile: '.avatar__input',
    uploadResult: '.avatar__result',
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (form.password[0].value !== form.password[1].value) {
      errorPassword(form, 'Пароли не совпадают');
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.avatar = await crp.result({
      type: 'base64',
      size: 'viewport',
    });

    if (!data.avatar.includes('base64')) {
      delete data.avatar;
    }

    const dataResponse = await postData(form.action, data, form.dataset.method);

    if (dataResponse.errors) {
      const errDiv = document.createElement('div');
      errDiv.className = 'form__error';
      errDiv.style.margin = '15px 0 0 0';
      dataResponse.errors.forEach(error => {
        const elemError = document.createElement('div');
        elemError.className = 'form__error';
        if (error.field !== 'password' && error.field !== 'category' && error.field !== 'avatar') {
          form[error.field].style.border = '1px solid #ff0000';
          elemError.textContent = error.message;
        } else if (error.field === 'category') {
          const catError = document.querySelector('.choices__inner');
          catError.style.border = '1px solid #ff0000';
          elemError.textContent = error.message;
        } else if (error.field === 'password') {
          errorPassword(form, error.message);
        } else if (error.field === 'avatar') {
          const avatarError = document.querySelector('.avatar__text');
          avatarError.style.border = '2px solid #ff0000';
          avatarError.style.borderRadius = '4px';
          avatarError.style.padding = '5px';
          elemError.textContent = error.message;
        }
        errDiv.append(elemError);
      });
      errDiv.textContent = 'Заполните все поля формы!';
      form.insertAdjacentElement('beforeend', errDiv);
      return;
    } else if (dataResponse.message) {
      errorPassword(form, dataResponse.message);
      return;
    }

    if (form.dataset.method !== 'PATCH') {
      const servicesList = document.querySelector('.services__list');
      servicesList.append(createCard(dataResponse));
    } else {
      const replaced = document.querySelector(`.service[data-id="${dataResponse.id}"]`);
      replaced.parentElement.replaceWith(createCard(dataResponse));
    }

    auth(dataResponse);
    form.reset();
    crp.hideAvatar();
    callback(event);
  });
};
