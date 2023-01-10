import { API_URL } from './const';
import { getData } from './getData';
import { store } from './store';

export const getCategory = async () => {
  const category = await getData(`${API_URL}/api/category`);
  store.categories = category;
};
