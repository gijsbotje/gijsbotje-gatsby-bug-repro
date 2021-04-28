import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './style.scss';

const Grid = ({
  column,
  container,
  row,
  xs,
  sm,
  md,
  lg,
  xl,
  align,
  justify,
  direction,
  wrap,
  spacing,
  className,
  component,
  children,
  ...rest
}) => {
  const Component = component;

  if (container && row) {
    // eslint-disable-next-line no-console
    console.error("Grid component: Don't use a container as a row");
  }
  if (container && column) {
    // eslint-disable-next-line no-console
    console.error("Grid component: Don't use a container as a column");
  }
  if (row && column) {
    // eslint-disable-next-line no-console
    console.error("Grid component: Don't use a column as a row");
  }

  return (
    <Component
      className={clsx(
        {
          container,
          row,
          [`spacing-${spacing}`]: row && spacing,
          [`justify-content-${justify}`]: row && justify,
          [`align-items-${align}`]: row && align,
          [`flex-${direction}`]: row && direction,
          [`flex-${wrap}`]: row && wrap,
          [`row-cols-${xs}`]: row && xs,
          [`row-cols-md-${md}`]: row && md,
          [`row-cols-sm-${sm}`]: row && sm,
          [`row-cols-lg-${lg}`]: row && lg,
          [`row-cols-xl-${xl}`]: row && xl,
          [`col-${xs}`]: column && xs && xs !== 'fill',
          [`col-md-${md}`]: column && md && md !== 'fill',
          [`col-sm-${sm}`]: column && sm && sm !== 'fill',
          [`col-lg-${lg}`]: column && lg && lg !== 'fill',
          [`col-xl-${xl}`]: column && xl && xl !== 'fill',
          [`col`]: column && ((xs && xs === 'fill') || (!xs && !sm && !lg && !xl)),
          [`col-md`]: column && md && md === 'fill',
          [`col-sm`]: column && sm && sm === 'fill',
          [`col-lg`]: column && lg && lg === 'fill',
          [`col-xl`]: column && xl && xl === 'fill',
        },
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

Grid.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline', undefined]),
  children: PropTypes.any,
  className: PropTypes.string,
  column: PropTypes.bool,
  component: PropTypes.elementType,
  container: PropTypes.any,
  direction: PropTypes.oneOf(['column', 'column-reverse', 'row', 'row-reverse', undefined]),
  justify: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'evenly', undefined]),
  lg: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto', 'fill', undefined]),
  md: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto', 'fill', undefined]),
  row: PropTypes.bool,
  sm: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto', 'fill', undefined]),
  spacing: PropTypes.oneOf([4, 8, 16, 30, 32, undefined]),
  wrap: PropTypes.oneOf(['wrap', 'nowrap', 'wrap-reverse', undefined]),
  xl: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto', undefined]),
  xs: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto', undefined]),
};

Grid.defaultProps = {
  align: undefined,
  children: undefined,
  className: undefined,
  column: false,
  component: 'div',
  container: false,
  direction: undefined,
  justify: undefined,
  lg: undefined,
  md: undefined,
  row: false,
  sm: undefined,
  spacing: undefined,
  wrap: undefined,
  xl: undefined,
  xs: undefined,
};

export default Grid;
