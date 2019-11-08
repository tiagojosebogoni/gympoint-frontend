import React from 'react';
import PropTypes from 'prop-types';
import { CustomButton } from './styles';
import colors from '~/styles/colors';

export default function Button({ children, type, color, ...rest }) {
  return (
    <CustomButton type={type} color={color} {...rest}>
      <span>{children}</span>
    </CustomButton>
  );
}

CustomButton.defaultProps = {
  type: 'button',
  color: colors.primary,
};

CustomButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  type: PropTypes.string,
  color: PropTypes.string,
};
