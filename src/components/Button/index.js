import React from 'react';
import PropTypes from 'prop-types';
import { CustomButton } from './styles';

export default function Button({ children, type }) {
  return (
    <CustomButton type={type}>
      <span>{children}</span>
    </CustomButton>
  );
}

CustomButton.defaultProps = {
  type: 'button',
};

CustomButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  type: PropTypes.string,
};
