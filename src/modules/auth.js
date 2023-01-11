import { store } from './store';

export const auth = data => {
  store.user.id = data.id;
  store.user.name = data.name;
  store.user.avatar = data.avatar;
  store.user.category = data.category;
  console.log('auth', store.user);
};
