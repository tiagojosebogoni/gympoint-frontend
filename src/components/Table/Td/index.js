import React from 'react';
import PropsTypes from 'prop-types';
import { CustomTd } from './styles';

export default function Td({ children, align }) {
  return <CustomTd align={align}>{children}</CustomTd>;
}

Td.defaultProps = {
  align: 'left',
};

Td.PropsTypes = {
  children: PropsTypes.oneOfType([
    PropsTypes.arrayOf(PropsTypes.node),
    PropsTypes.node,
  ]).isRequired,
  align: PropsTypes.string,
};
