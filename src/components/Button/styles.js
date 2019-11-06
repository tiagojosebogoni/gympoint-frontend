import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const CustomButton = styled.button`
  height: 34px;
  background: ${colors.primary};
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  padding: 0px 15px;

  color: #fff;
  font-weight: bold;
  text-transform: uppercase;

  transition: background 0.2s;
  &:hover {
    background: ${darken(0.05, colors.primary)};
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
