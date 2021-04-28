import React from 'react';
import PropTypes from 'prop-types';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import Icon from '../Icon';
import Typography from '../Typography';
import './style.scss';

const OverlayMessage = ({ children, show, disableBackground, color, className, message, icon }) => (
  <div className={clsx('overlay-message-wrapper', className)}>
    {show && (
      <div className={clsx('overlay-message-wrapper-indicator', { 'disable-background': disableBackground })}>
        <Icon icon={icon} size="4x" className={clsx(`text-${color}`, 'message-overlay-wrapper-icon')} />
        <Typography>{message}</Typography>
      </div>
    )}
    {children}
  </div>
);

OverlayMessage.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'white']),
  disableBackground: PropTypes.bool,
  show: PropTypes.bool,
  message: PropTypes.string,
  icon: PropTypes.any,
};

OverlayMessage.defaultProps = {
  children: undefined,
  className: undefined,
  color: 'success',
  disableBackground: false,
  show: false,
  message: null,
  icon: faCheck,
};

export default OverlayMessage;
