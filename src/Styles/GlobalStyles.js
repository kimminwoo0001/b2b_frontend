import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyles = createGlobalStyle`
 ${reset}
  * {
  box-sizing: border-box;
  }
  a {
  text-decoration: none;
  color: inherit;
  }
  img {
    max-width: 100%;
  }
  button,
  input {
    outline: 0;
    border: 0;
    background: none;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  html,
  body {
    width: 100%;
    height: 100%;
    font-family:'Spoqa Han Sans';
    /* font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,'Apple SD Gothic Neo', 'Open Sans', 'Helvetica Neue', sans-serif; */
  }
`;
