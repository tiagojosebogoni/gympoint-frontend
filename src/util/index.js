export const { format: formatCurrencyBR } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const numberOnly = value => {
  return Number(value.replace(/\D/g, ''));
};

// export const teste = amount => {
//   //truncate the amount to 0 decimals
//   //for every digit that is followed by 3 digits and a word boundary
//   //add a comma
//   const value = amount.toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
//   return value;
// };

export const formatCurrency = value => {
  if (!value) return value;

  // console.log('teste', value.toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g, '$1,'));
  // var count = (value.match(/,/g) || []).length;
  // var countPonto = (value.match(/\.\/g) || []).length;
  // console.log('count', count, countPonto, value);
  // if (count === 0 && countPonto === 0) {
  // value = `${value}.00`;
  // }

  // console.log('value', value);

  value = value.replace(/\./g, ',');
  // console.log('value', value);
  const index = value.lastIndexOf(',');
  // console.log('index', index);

  const first = `${value.substr(0, index).replace(/,/g, '')}`;
  // console.log('first', first);
  const decimal = `${value.substr(index).replace(',', '.')}`;
  // console.log('decimal', decimal);

  const currency = Number(`${first}${decimal}`);

  console.log('Currency: ', currency);

  return currency;
  // return new Intl.NumberFormat('en-US').format(currency);
};
