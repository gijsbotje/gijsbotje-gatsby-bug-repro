import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import clsx from 'clsx';

const CardHeader = ({ children, disableBorder, className, ...props }) => (
  <div className={clsx(className, 'card-header', { 'border-0': disableBorder })} {...props}>
    {children}
  </div>
);

CardHeader.propTypes = {
  disableBorder: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
};

CardHeader.defaultProps = {
  disableBorder: false,
  children: undefined,
  className: undefined,
};

export default CardHeader;
