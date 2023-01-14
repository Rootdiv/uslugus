import { API_URL } from './const';
import { postData } from './postData';

export const sendComment = (form, callback) => {
  form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const dataResponse = await postData(`${API_URL}/api/service/comment/${form.dataset.id}`, data);

    if (dataResponse.errors) {
      const errDiv = document.createElement('div');
      errDiv.className = 'form__error';
      errDiv.style.margin = '15px 0 0 0';
      dataResponse.errors.forEach(error => {
        const elemError = document.createElement('div');
        elemError.className = 'form__error';
        form[error.field].style.border = '1px solid #ff0000';
        elemError.textContent = error.message;
        form.insertAdjacentElement('afterbegin', elemError);
      });
      errDiv.textContent = 'Заполните все поля формы!';
      form.insertAdjacentElement('beforeend', errDiv);
      return;
    }

    form.reset();
    callback(event);
  });
};
