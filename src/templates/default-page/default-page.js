import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Content from '../../components/Content';
import Layout from '../../components/Layout';
import Grid from '../../components/Grid';

const DefaultPageTemplate = ({ seo, content, contentComponent, location }) => {
  const PostContent = contentComponent || Content;

  return (
    <Layout location={location}>
      <Helmet
        title={seo?.title}
        meta={[
          {
            name: 'description',
            content: seo?.description,
          },
        ]}
      />
      <Grid container className="py-40">
        <PostContent content={content} className="body-large typography" />
      </Grid>
    </Layout>
  );
};

DefaultPageTemplate.propTypes = {
  seo: PropTypes.object,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  location: PropTypes.object,
};

DefaultPageTemplate.defaultProps = {
  contentComponent: undefined,
  location: undefined,
  seo: {},
};

export default DefaultPageTemplate;
