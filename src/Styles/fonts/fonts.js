import { createGlobalStyle } from "styled-components";
import Font from "./Spoqa_Han_Sans_Regular.woff";

export const GlobalFonts = createGlobalStyle`
    @font-face {
        font-family:'Spoqa Han Sans';
        src: url(${Font})
        format('woff')
    }
`;
