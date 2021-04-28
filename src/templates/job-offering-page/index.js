import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { HTMLContent } from '../../components/Content/Content';
import JobOfferingPageTemplate from './job-offering-page';

const JobOfferingPage = ({ data, location }) => {
  const { frontmatter, html } = data?.markdownRemark || {};

  return (
    <JobOfferingPageTemplate
      seo={frontmatter?.seo}
      title={frontmatter?.title}
      date={frontmatter?.date}
      content={html}
      contentComponent={HTMLContent}
      location={location}
    />
  );
};

JobOfferingPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
      timeToRead: PropTypes.number,
      html: PropTypes.node.isRequired,
    }),
  }),
  location: PropTypes.object,
};

JobOfferingPage.defaultProps = {
  data: {
    markdownRemark: {
      frontmatter: {},
      timeToRead: 0,
    },
  },
  location: undefined,
};

export default JobOfferingPage;

export const pageQuery = graphql`
  query($frontmatterPath: String!) {
    markdownRemark(frontmatter: { path: { eq: $frontmatterPath } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
