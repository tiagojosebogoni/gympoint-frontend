import React from 'react';
import PropsTypes from 'prop-types';
import { CustomTable } from './styles';

export default function Table({ children }) {
  return <CustomTable>{children}</CustomTable>;
}

Table.PropsTypes = {
  children: PropsTypes.oneOfType([
    PropsTypes.arrayOf(PropsTypes.node),
    PropsTypes.node,
  ]).isRequired,
};
