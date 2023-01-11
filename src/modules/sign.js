import { auth } from './auth';
import { avatarController } from './avatarController';
import { API_URL } from './const';
import { postData } from './postData';

export const signInController = callback => {
  const form = document.querySelector('.form_sign-in');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const dataResponse = await postData(`${API_URL}/api/service/signin`, data);

    if (dataResponse.errors) {
      console.log(dataResponse.errors);
      return;
    }

    auth(dataResponse);
    form.reset();
    callback(event);
  });
};

export const signUpController = callback => {
  const form = document.querySelector('.form_sign-up');

  const crp = avatarController({
    inputFile: '.avatar__input',
    uploadResult: '.avatar__result',
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (form.password[0].value !== form.password[1].value) {
      console.log('Пароли не совпадают');
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    data.avatar = await crp.result({
      type: 'base64',
      size: 'viewport',
    });

    const dataResponse = await postData(`${API_URL}/api/service/signup`, data);

    if (dataResponse.errors) {
      console.log(dataResponse.errors);
      return;
    }

    auth(dataResponse);
    form.reset();
    crp.hideAvatar();
    callback(event);
  });
};
