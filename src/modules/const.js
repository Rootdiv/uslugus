export const API_URL =
  process.env.NODE_ENV === 'production' ? 'https://api.rootdiv.ru/uslugus' : 'http://localhost:2606';

export const directions = {
  from: 'от',
  exactly: '',
  'up to': 'до',
};
