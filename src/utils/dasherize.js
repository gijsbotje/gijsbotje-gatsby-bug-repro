import decamelize from './decamelize';

export default function dasherize(value) {
  return decamelize(value).replace(/[ _]/g, '-');
}
