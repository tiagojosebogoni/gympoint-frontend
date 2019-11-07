import React from 'react';
import PropsTypes from 'prop-types';

import { CustomContainer } from './styles';

export default function Container({ children }) {
  return <CustomContainer>{children}</CustomContainer>;
}

Container.PropsTypes = {
  children: PropsTypes.oneOfType([
    PropsTypes.arrayOf(PropsTypes.node),
    PropsTypes.node,
  ]).isRequired,
};
