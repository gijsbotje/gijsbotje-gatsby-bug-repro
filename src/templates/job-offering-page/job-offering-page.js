import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Content from '../../components/Content';
import Layout from '../../components/Layout';
import Grid from '../../components/Grid';
import Typography from '../../components/Typography';
import GradientBanner from '../../components/GradientBanner';

const JobOfferingPageTemplate = ({ seo, content, title, date, contentComponent, location }) => {
  const PostContent = contentComponent || Content;

  return (
    <Layout location={location} headerOptions={{ variant: 'fixed-top', bgColor: 'transparent', color: 'dark' }}>
      <Helmet
        title={seo?.title}
        meta={[
          {
            name: 'description',
            content: seo?.description,
          },
        ]}
      />
      <GradientBanner className="pt-160 pb-80">
        <Grid container>
          <Grid row justify="center">
            <Grid column xs={12}>
              <Typography color="white" variant="h1" align="center" className="mb-16">
                {title}
              </Typography>
              <Typography color="white" variant="h4" align="center" className="mb-16">
                {date}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </GradientBanner>
      <Grid container className="py-40">
        <Grid row justify="center">
          <Grid column xs={12} lg={10} xl={8}>
            <PostContent content={content} className="body-large typography" />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

JobOfferingPageTemplate.propTypes = {
  seo: PropTypes.object,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  location: PropTypes.object,
  title: PropTypes.string,
  date: PropTypes.string,
};

JobOfferingPageTemplate.defaultProps = {
  contentComponent: undefined,
  location: undefined,
  seo: {},
  title: undefined,
  date: undefined,
};

export default JobOfferingPageTemplate;
