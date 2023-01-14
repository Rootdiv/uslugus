export const clearFormError = form => {
  form.querySelectorAll('.choices__inner').forEach(item => {
    item.removeAttribute('style');
  });

  const avatar = form.querySelector('.avatar__text');
  if (avatar) {
    avatar.removeAttribute('style');
  }

  form.querySelectorAll('.form__error').forEach(item => {
    item.remove();
  });

  form.querySelectorAll('[name]').forEach(item => {
    item.removeAttribute('style');
  });
};
