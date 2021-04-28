import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon';
import './style.scss';

const LoadingWrapper = ({ children, isLoading, disableBackground, color, className }) => (
  <div className={clsx('loading-wrapper', className)}>
    {isLoading && (
      <div className={clsx('loading-wrapper-indicator', { 'disable-background': disableBackground })}>
        <Icon icon={faSpinner} spin size="4x" className={clsx(`text-${color}`, 'loading-wrapper-spinner')} />
      </div>
    )}
    {children}
  </div>
);

LoadingWrapper.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'white']),
  disableBackground: PropTypes.bool,
  isLoading: PropTypes.bool,
};

LoadingWrapper.defaultProps = {
  children: undefined,
  className: undefined,
  color: 'primary',
  disableBackground: false,
  isLoading: false,
};

export default LoadingWrapper;
