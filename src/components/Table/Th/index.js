import React from 'react';
import PropsTypes from 'prop-types';
import { CustomTh } from './styles';

export default function Th({ children }) {
  return <CustomTh>{children}</CustomTh>;
}

Th.propsTypes = {
  children: PropsTypes.oneOfType([PropsTypes.element, PropsTypes.string]),
};
