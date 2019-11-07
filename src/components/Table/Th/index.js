import React from 'react';
import PropsTypes from 'prop-types';
import { CustomTh } from './styles';

export default function Th({ children, align }) {
  return <CustomTh align={align}>{children}</CustomTh>;
}

Th.defaultProps = {
  align: 'left',
};

Th.PropsTypes = {
  children: PropsTypes.oneOfType([
    PropsTypes.arrayOf(PropsTypes.node),
    PropsTypes.node,
  ]).isRequired,
};
