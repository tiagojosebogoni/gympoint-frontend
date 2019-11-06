import React from 'react';
import PropsTypes from 'prop-types';
import { CustomTbody } from './styles';

export default function Tbody({ children }) {
  return <CustomTbody>{children}</CustomTbody>;
}

Tbody.propsTypes = {
  children: PropsTypes.oneOfType([PropsTypes.element]),
};
