import styled from 'styled-components';
export const CustomModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: ${props => (props.isShow ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  width: ${props => props.width};
  background: #fff;
  border-radius: 4px;
  padding: 20px;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  svg {
    cursor: pointer;
  }
  margin-bottom: 10px;
  border-bottom: 1px solid #dddddd;
`;

export const Title = styled.h3`
  color: #333;
`;

export const Content = styled.div`
  margin-top: 10px;
`;