import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './style.scss';
import Gradient from '../../utils/gradient';

const GradientBanner = ({ className, children }) => {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('.colored-gradient');
  }, []);

  return (
    <div className={clsx('gradient-container', className)}>
      <canvas className="colored-gradient" />
      {children}
    </div>
  );
};

GradientBanner.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

GradientBanner.defaultProps = {
  children: undefined,
  className: undefined,
};

export default GradientBanner;
