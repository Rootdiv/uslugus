export const selectController = ({ openBtn, openBlock, closeBlock, handleChange = () => {} }) => {
  const btn = document.querySelector(openBtn);
  const selectBlock = document.querySelector(openBlock);

  const selected = {
    handleChange,
    onChange: handleChange => {
      selected.handleChange = handleChange;
    },
    value: '',
  };

  const toggleSelectBlock = () => {
    btn.classList.toggle(`${openBtn.slice(1)}_open`);
    selectBlock.classList.toggle(`${openBlock.slice(1)}_open`);
  };

  btn.addEventListener('click', toggleSelectBlock);

  selectBlock.addEventListener('click', ({ target }) => {
    const option = target.closest(closeBlock);
    if (option) {
      toggleSelectBlock();
      selected.value = option.dataset.value ? option.dataset.value : option.textContent;
      selected.handleChange(selected.value);
    }
  });

  return selected;
};
