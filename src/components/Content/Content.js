import React from 'react';
import PropTypes from 'prop-types';

export const HTMLContent = ({ content, className }) => (
  // eslint-disable-next-line react/no-danger
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);

const Content = ({ content, className }) => <div className={className}>{content}</div>;

Content.propTypes = {
  content: PropTypes.node,
};

Content.defaultProps = {
  content: null,
};

HTMLContent.propTypes = Content.propTypes;
HTMLContent.defaultProps = Content.defaultProps;

export default Content;
