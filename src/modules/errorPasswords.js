export const errorPassword = (formElem, message) => {
  const errPass = document.querySelector('.form__fieldset_passwords');
  const errDiv = document.createElement('div');
  errDiv.className = 'form__error';
  errDiv.textContent = message;
  if (formElem.password.length) {
    errPass.before(errDiv);
    formElem.password.forEach(elem => {
      elem.style.border = '1px solid #ff0000';
    });
  } else {
    formElem.insertAdjacentElement('afterbegin', errDiv);
    formElem.password.style.border = '1px solid #ff0000';
  }
};
