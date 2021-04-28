import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { HTMLContent } from '../../components/Content/Content';
import DefaultPageTemplate from './default-page';

const DefaultPage = ({ data, location }) => {
  const { frontmatter, html } = data?.markdownRemark || {};

  return (
    <DefaultPageTemplate seo={frontmatter?.seo} content={html} contentComponent={HTMLContent} location={location} />
  );
};

DefaultPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
      timeToRead: PropTypes.number,
      html: PropTypes.node.isRequired,
    }),
  }),
  location: PropTypes.object,
};

DefaultPage.defaultProps = {
  data: {
    markdownRemark: {
      frontmatter: {},
      timeToRead: 0,
    },
  },
  location: undefined,
};

export default DefaultPage;

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        seo {
          title
          description
        }
      }
    }
  }
`;
