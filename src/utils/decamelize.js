export default function decamelize(value) {
  return value.replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
}
