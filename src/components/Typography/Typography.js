import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './style.scss';

const variantMapping = {
  'display-1': 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'paragraph-1': 'p',
  'paragraph-2': 'p',
  overline: 'p',
  subtitle: 'div',
  caption: 'div',
  'button-1': 'span',
  'button-2': 'span',
  'button-3': 'span',
  'button-4': 'span',
};

const Typography = ({
  align,
  variant,
  component,
  color,
  weight,
  disableMargin,
  fontFamily,
  className,
  children,
  ...props
}) => {
  const Component = component || variantMapping[variant] || 'span';

  return (
    <Component
      {...props}
      className={clsx(
        'typography',
        {
          [variant]: Component !== variant,
          [`font-family-${fontFamily}`]: fontFamily,
          [`text-${color}`]: color,
          [`weight-${weight}`]: weight,
          [`text-${align}`]: align,
          'my-0': disableMargin,
        },
        className,
      )}
    >
      {children}
    </Component>
  );
};

export default Typography;

Typography.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right', undefined]),
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'inherit',
    'primary',
    'danger',
    'warning',
    'success',
    'info',
    'white',
    'text-primary',
    'text-secondary',
    'heading',
    'black',
    undefined,
  ]),
  component: PropTypes.elementType,
  disableMargin: PropTypes.bool,
  fontFamily: PropTypes.oneOf(['base', 'headings', undefined]),
  variant: PropTypes.oneOf([
    'display-1',
    'h1',
    'h2',
    'paragraph-1',
    'paragraph-2',
    'subtitle',
    'caption',
    'button-1',
    'button-2',
    'button-3',
    'button-4',
    'overline',
    'sr-only',
    'inherit',
  ]),
  weight: PropTypes.oneOf([
    'extra-light',
    'light',
    'thin',
    'normal',
    'medium',
    'semi-bold',
    'bold',
    'extra-bold',
    'black',
    undefined,
  ]),
};

Typography.defaultProps = {
  align: undefined,
  className: undefined,
  children: undefined,
  color: undefined,
  component: undefined,
  disableMargin: true,
  fontFamily: undefined,
  variant: 'paragraph-1',
  weight: undefined,
};
