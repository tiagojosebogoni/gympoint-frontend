import React from 'react';
import PropTypes from 'prop-types';

import { CustomContainer } from './styles';

export default function Container({ children }) {
  return <CustomContainer>{children}</CustomContainer>;
}

Container.propTypes = {
  children: PropTypes.element.isRequired,
};
