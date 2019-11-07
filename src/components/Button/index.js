import React from 'react';
import PropTypes from 'prop-types';
import { CustomButton } from './styles';
import colors from '~/styles/colors';

export default function Button({ children, type, color, formId }) {
  return (
    <CustomButton type={type} color={color} form={formId}>
      <span>{children}</span>
    </CustomButton>
  );
}

CustomButton.defaultProps = {
  type: 'button',
  color: colors.primary,
  formId: null,
};

CustomButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  type: PropTypes.string,
  color: PropTypes.string,
  formId: PropTypes.string,
};
