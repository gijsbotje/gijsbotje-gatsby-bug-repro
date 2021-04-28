import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { faCheck, faExclamation, faQuestion, faTimes } from '@fortawesome/free-solid-svg-icons';
import CardBody from '../CardBody';
import Typography from '../Typography';
import Card from '../Card';
import './style.scss';
import Icon from '../Icon';

const Alert = ({ severity, cardProps, icon, title, message }) => {
  const getSeverityIcon = () => {
    if (severity === 'warning') {
      return faExclamation;
    }
    if (severity === 'danger') {
      return faTimes;
    }
    if (severity === 'success') {
      return faCheck;
    }

    return faQuestion;
  };

  return (
    <Card {...cardProps} className={clsx('card-alert', `card-alert-${severity}`)} role="alert">
      <CardBody>
        <div className="d-flex align-items-start">
          <Icon icon={icon ?? getSeverityIcon()} className={clsx(`text-${severity}`, 'mt-4 mr-24')} fixedWidth />
          <div>
            <Typography variant="h6" component="div" className="mb-4">
              {title}
            </Typography>
            {message && <Typography variant="body">{message}</Typography>}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

Alert.propTypes = {
  cardProps: PropTypes.object,
  icon: PropTypes.object,
  message: PropTypes.string,
  severity: PropTypes.oneOf(['success', 'warning', 'info', 'danger', 'primary', 'secondary', 'light', 'dark']),
  title: PropTypes.string.isRequired,
};

Alert.defaultProps = {
  cardProps: undefined,
  icon: undefined,
  message: null,
  severity: 'info',
};

export default Alert;
