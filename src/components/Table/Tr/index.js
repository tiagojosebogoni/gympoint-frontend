import React from 'react';
import PropsTypes from 'prop-types';
import { CustomTr } from './styles';

export default function Tr({ children }) {
  return <CustomTr>{children}</CustomTr>;
}

Tr.propsTypes = {
  children: PropsTypes.oneOfType([PropsTypes.element, PropsTypes.string]),
};
