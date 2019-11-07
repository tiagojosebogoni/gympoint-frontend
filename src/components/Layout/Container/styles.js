import styled from 'styled-components';

export const CustomContainer = styled.div`
  /* max-width: 1200px;
  margin: 20px auto;

  display: flex;
  flex-direction: column; */

  max-width: 1360px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;

  &:before,
  &:after {
    content: ' ';
    display: table;
  }
  &:after {
    clear: both;
  }
`;
