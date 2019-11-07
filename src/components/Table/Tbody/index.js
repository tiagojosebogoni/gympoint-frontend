import React from 'react';
import PropsTypes from 'prop-types';
import { CustomTbody } from './styles';

export default function Tbody({ children, align }) {
  return <CustomTbody align={align}>{children}</CustomTbody>;
}

Tbody.defaultProps = {
  align: 'left',
};

Tbody.PropsTypes = {
  children: PropsTypes.oneOfType([
    PropsTypes.arrayOf(PropsTypes.node),
    PropsTypes.node,
  ]).isRequired,
};
