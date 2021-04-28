import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Icon = ({ icon, ...options }) => <FontAwesomeIcon icon={icon} {...options} />;

Icon.propTypes = {
  ...FontAwesomeIcon.propTypes,
};

export default Icon;
