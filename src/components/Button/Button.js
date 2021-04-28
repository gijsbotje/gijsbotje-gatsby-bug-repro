import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({
  block,
  color,
  outline,
  size,
  component,
  href,
  children,
  className,
  rounded,
  disableOverlay,
  ...rest
}) => {
  const Component = component || href !== undefined ? 'a' : 'button';

  return (
    <Component
      href={href}
      className={clsx(
        'btn',
        {
          [`btn-${outline ? 'outline-' : ''}${color}`]: color,
          [`btn-size-${size}`]: [1, 2, 3, 4].includes(size),
          'btn-block': block,
          'text-gray-900': outline && color === 'light',
          'text-white': outline && color === 'dark',
          'rounded-pill': rounded,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

Button.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'dark',
    'light',
    'white',
    'link',
  ]),
  component: PropTypes.elementType,
  disableOverlay: PropTypes.bool,
  href: PropTypes.string,
  size: PropTypes.oneOf([1, 2, 3, 4]),
  outline: PropTypes.bool,
  rounded: PropTypes.bool,
};

Button.defaultProps = {
  block: false,
  className: undefined,
  color: 'primary',
  component: undefined,
  disableOverlay: false,
  href: undefined,
  size: 3,
  outline: false,
  rounded: false,
};

export default Button;
