import React from 'react';
import PropsTypes from 'prop-types';
import { CustomThead } from './styles';

export default function Thead({ children }) {
  return <CustomThead>{children}</CustomThead>;
}

Thead.propsTypes = {
  children: PropsTypes.oneOfType([PropsTypes.element]),
};
