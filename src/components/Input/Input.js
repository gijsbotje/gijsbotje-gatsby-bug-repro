import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Input = React.forwardRef(
  ({ value, onChange, name, errors, label, type, placeholder, showLabel, id, className, ...props }, ref) => {
    const Tag = type === 'textarea' ? 'textarea' : 'input';
    return (
      <>
        <label htmlFor={id} className={clsx({ 'sr-only': !showLabel })}>
          {label}
        </label>
        <Tag
          className={clsx('form-control', className, errors?.[name]?.message ? 'is-invalid' : null)}
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          ref={ref}
          {...props}
        />
        {errors?.[name] && <div className="invalid-feedback">{errors?.[name]?.message.replace(name, label)}</div>}
      </>
    );
  },
);

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  showLabel: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'email', 'tel', 'password', 'checkbox', 'url']),
  value: PropTypes.string,
};

Input.defaultProps = {
  className: undefined,
  label: undefined,
  errors: {},
  placeholder: undefined,
  showLabel: true,
  type: 'text',
  value: undefined,
  onChange: undefined,
};

export default Input;
