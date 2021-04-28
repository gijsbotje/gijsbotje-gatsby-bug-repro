import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import get from 'lodash/get';

const Meta = ({ site, title }) => {
  const siteTitle = get(site, 'title');
  const formattedTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet
      title={formattedTitle}
      meta={[
        {
          name: 'description',
          content: get(site, 'description'),
        },
      ]}
    />
  );
};

Meta.propTypes = {
  site: PropTypes.object,
  title: PropTypes.string,
};

Meta.defaultProps = {
  site: undefined,
  title: null,
};

export default Meta;
