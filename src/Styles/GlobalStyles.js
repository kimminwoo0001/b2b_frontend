import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { colors } from "./ui";

export const GlobalStyles = createGlobalStyle`
${reset}
:root {
  --delay: 200ms
}
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


  /* react-modal */

.ReactModal__Overlay {
  opacity: 0;
  transition: opacity var(--delay) ease-in-out;
}
.ReactModal__Overlay--after-open {
  opacity: 1;
}
.item-exit {
  opacity: 1;
}
.item-exit-active {
  opacity: 0;
  transition: opacity var(--delay) ease-in;
}
  
`;
