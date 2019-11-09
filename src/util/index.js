export const { format: formatCurrencyBR } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const numberOnly = value => {
  return Number(value.replace(/\D/g, ''));
};

export const formatCurrency = value => {
  if (!value) return value;

  value = value.replace(/\./g, ',');
  const index = value.lastIndexOf(',');

  const first = `${value.substr(0, index).replace(/\,/g, '')}`;
  const decimal = `${value.substr(index).replace(',', '.')}`;

  const currency = Number(`${first}${decimal}`);

  // console.log('Currency: ', currency);

  return new Intl.NumberFormat('en-US').format(currency);
};
