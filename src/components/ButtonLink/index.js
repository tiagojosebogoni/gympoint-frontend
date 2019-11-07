import React from 'react';
import PropTypes from 'prop-types';
import { CustomButtonLink } from './styles';

import colors from '~/styles/colors';

export default function ButtonLink({ children, pathRoute, color }) {
  return (
    <CustomButtonLink to={pathRoute} color={color}>
      <span>{children}</span>
    </CustomButtonLink>
  );
}

ButtonLink.defaultProps = {
  color: colors.primary,
};

CustomButtonLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  pathRoute: PropTypes.string,
  color: PropTypes.string,
};
