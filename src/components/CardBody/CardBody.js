import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const CardBody = ({ children, className, ...rest }) => (
  <div {...rest} className={clsx('card-body', className)}>
    {children}
  </div>
);

CardBody.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

CardBody.defaultProps = {
  children: undefined,
  className: null,
};

export default CardBody;
