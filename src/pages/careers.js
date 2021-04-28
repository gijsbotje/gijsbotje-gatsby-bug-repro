import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import Grid from '../components/Grid';
import Typography from '../components/Typography';
import GradientBanner from '../components/GradientBanner';

const Careers = ({ data, location }) => (
  <Layout location={location} headerOptions={{ variant: 'fixed-top', bgColor: 'transparent', color: 'dark' }}>
    <Helmet
      title="gijsbotje - Job Openings"
      meta={[
        {
          name: 'description',
          content: 'Come work with us',
        },
      ]}
    />
    <GradientBanner className="pt-160 pb-80">
      <Grid container>
        <Grid row justify="center">
          <Grid column xs={11} sm={11} md={10} lg={8} xl={6}>
            <Typography color="white" variant="h1" align="center" className="mb-16">
              Careers
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </GradientBanner>
    <Grid container className="pt-80 pb-40">
      <Typography className="mb-56" variant="h3" component="div" align="center">
        Available Job Openings
      </Typography>
      {data.allMarkdownRemark.nodes.map(item => (
        <Grid className="my-40" row align="baseline" component={Link} to={`/careers/${item?.frontmatter?.path}/`}>
          <Grid column xs={12} md={5}>
            <Typography variant="paragraph-2" component="div" color="muted" className="text-center text-md-right">
              {item?.frontmatter?.date}
            </Typography>
          </Grid>
          <Grid column xs={12} md={7}>
            <Typography variant="h4" component="div" color="black" className="text-center text-md-left">
              {item?.frontmatter?.title}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  </Layout>
);

Careers.propTypes = {
  location: PropTypes.object,
  data: PropTypes.object,
};

Careers.defaultProps = {
  location: {},
  data: {},
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "job-offering-page" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        frontmatter {
          path
          date(formatString: "MMMM DD, YYYY")
          title
        }
      }
    }
  }
`;

export default Careers;
