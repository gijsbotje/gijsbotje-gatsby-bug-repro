import capitalize from './capitalize';
import deDasherize from './deDasherize';

export default location => {
  const { pathname, origin } = location || {};

  const parts = pathname.split('/');
  if (pathname.endsWith('/')) {
    parts.pop();
  }
  return parts.reduce(
    (acc, part, idx) => [
      ...acc,
      {
        label: deDasherize(capitalize(part)) || 'Home',
        href: `${origin}/${parts
          .slice(0, idx + 1)
          .filter(piece => piece !== '')
          .join('/')}`,
      },
    ],
    [],
  );
};
