import React from 'react';
import PropsTypes from 'prop-types';
import { CustomThead } from './styles';

export default function Thead({ children, align }) {
  return <CustomThead align={align}>{children}</CustomThead>;
}

Thead.defaultProps = {
  align: 'left',
};

Thead.propsTypes = {
  children: PropsTypes.oneOfType([
    PropsTypes.arrayOf(PropsTypes.node),
    PropsTypes.node,
  ]).isRequired,
};
