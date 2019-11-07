import { createGlobalStyle } from 'styled-components';
import { lighten } from 'polished';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import colors from '~/styles/colors';
export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }  

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  input {
      background: rgba(255, 255, 255, 1);
      border: 1px solid ${colors.border};
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: ${colors.input};
      margin: 0 0 10px;

      &::placeholder {
        color: ${colors.placeholder};
      }

      &:focus {
        background:  ${lighten(0.45, colors.focus)}
        border: 1px solid ${colors.focus};
      }
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
  }

`;
