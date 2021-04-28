import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './style.scss';

const Divider = ({ color, className }) => <hr className={clsx(`divider divider-${color}`, className)} />;

Divider.propTypes = {
  color: PropTypes.oneOf(['gray-300']),
  className: PropTypes.string,
};

Divider.defaultProps = {
  color: 'gray-300',
  className: undefined,
};

export default Divider;
