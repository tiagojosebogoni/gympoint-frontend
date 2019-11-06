import React from 'react';
import PropsTypes from 'prop-types';
import { CustomTd } from './styles';

export default function Td({ children }) {
  return <CustomTd>{children}</CustomTd>;
}

Td.propsTypes = {
  children: PropsTypes.oneOfType([PropsTypes.element, PropsTypes.string]),
};
