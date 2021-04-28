import deDasherize from './deDasherize';
import capitalize from './capitalize';

export default location => {
  const { pathname, origin } = location || {};

  const parts = pathname.split('/');
  if (pathname.endsWith('/')) {
    parts.pop();
  }

  if (parts.length < 2) {
    return '';
  }

  const breadcrumbs = parts.reduce(
    (acc, part, idx) => [
      ...acc,
      {
        '@type': 'ListItem',
        position: idx + 1,
        name: deDasherize(capitalize(part)) || 'Home',
        ...(idx + 1 !== parts.length
          ? {
              item: `${origin}/${parts
                .slice(0, idx + 1)
                .filter(piece => piece !== '')
                .join('/')}`,
            }
          : {}),
      },
    ],
    [],
  );

  return `${JSON.stringify({
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs,
  })},`;
};
