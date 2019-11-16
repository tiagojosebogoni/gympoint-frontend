import React from 'react';
import PropTypes from 'prop-types';
import { CustomButton } from './styles';
import colors from '~/styles/colors';

export default function Button({ type, color, label, icon, ...rest }) {
  return (
    <CustomButton type={type} color={color} {...rest}>
      {icon}
      {label}
    </CustomButton>
  );
}

CustomButton.defaultProps = {
  type: 'button',
  color: colors.primary,
  label: '',
  icon: null,
};

CustomButton.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.element,
};
