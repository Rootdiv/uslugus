import { store } from './store';

export const categoryRus = category => store.categories.find(item => item.title === category).rus;
