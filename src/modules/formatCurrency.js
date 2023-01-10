export const formatCurrency = num =>
  new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(num);
