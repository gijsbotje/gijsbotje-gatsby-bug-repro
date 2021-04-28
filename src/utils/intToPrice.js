export default (value = 0, currency = 'EUR', language = 'nl-NL') =>
  new Intl.NumberFormat(language, { style: 'currency', currency }).format(value);
