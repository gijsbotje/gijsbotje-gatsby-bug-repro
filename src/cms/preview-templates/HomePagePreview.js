import React from 'react';
import PropTypes from 'prop-types';
import { createHistory, LocationProvider } from '@reach/router';
import HomeTemplate from '../../templates/home-page/home-page';

const HomePagePreview = ({ entry, window }) => {
  const data = entry.getIn(['data']).toJS();
  const history = createHistory(window);
  const { seo, home } = data;
  const { sections, partners, banner, cta } = home;

  return (
    <LocationProvider history={history}>
      <HomeTemplate seo={seo} partners={partners} banner={banner} sections={sections} cta={cta} />
    </LocationProvider>
  );
};

HomePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  window: PropTypes.object,
};

HomePagePreview.defaultProps = {
  entry: {},
  window: undefined,
};

export default HomePagePreview;
