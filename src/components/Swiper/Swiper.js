import React from 'react';
import PropTypes from 'prop-types';
import OGSwiper from 'react-id-swiper';
import clsx from 'clsx';
import './style.scss';

const Swiper = ({ children, overflow, className, arrows, ...rest }) => (
  <OGSwiper {...rest} containerClass={clsx(className, 'swiper-container', { 'swiper-container-overflow': overflow })}>
    {children}
  </OGSwiper>
);

Swiper.propTypes = {
  children: PropTypes.any,
  overflow: PropTypes.bool,
  className: PropTypes.string,
  arrows: PropTypes.bool,
};

Swiper.defaultProps = {
  children: undefined,
  overflow: true,
  className: null,
  arrows: false,
};

export default Swiper;
