import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Typography from '../components/Typography';

const NotFound = ({ location }) => (
  <Layout location={location}>
    <Helmet title="404 page not found" />
    <Grid container className="pt-120 pb-144">
      <Typography variant="h1" className="mb-12">
        Page not found
      </Typography>
      <Typography variant="subtitle-1" className="mb-40">
        This page was moved or could not be found
      </Typography>
    </Grid>
  </Layout>
);

NotFound.propTypes = {
  location: PropTypes.object,
};

NotFound.defaultProps = {
  location: {},
};

export default NotFound;
