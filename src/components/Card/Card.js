import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './style.scss';

const Card = ({ elevation, children, color, component, border, rounded, className, ...rest }) => {
  const Component = component;

  return (
    <Component
      {...rest}
      className={clsx(
        'card',
        {
          [`card-elevation-${elevation}`]: elevation,
          [`bg-${color}`]: color,
          'card-border': border,
          'rounded-0': !rounded,
        },
        className,
      )}
    >
      {children}
    </Component>
  );
};

Card.propTypes = {
  border: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.any,
  color: PropTypes.any,
  component: PropTypes.elementType,
  elevation: PropTypes.number,
  rounded: PropTypes.bool,
};

Card.defaultProps = {
  border: false,
  children: undefined,
  className: undefined,
  color: undefined,
  component: 'div',
  elevation: 1,
  rounded: true,
};

export default Card;
