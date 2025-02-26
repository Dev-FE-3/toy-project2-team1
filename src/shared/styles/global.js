import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
${reset}
/* other styles */

@font-face {
  font-family: "Inter";
  src: url("/font/Inter-VariableFont_opsz,wght.ttf") format("truetype");
  font-weight: 100 900;
  font-style: normal;
}

:root {
  font-family: "Inter", sans-serif;
  --background-sub: #F7F2FF;
  --background-main: #F3F4F6;
  --box-container: #FFFFFF;
  --font-main: #2D3648;
  --font-sub: #7A7E87;
  --main: #9B30FF;
  --point-gray: #BDBDBD;
  --point-red: #EE534F;
  --point-yellow: #FBC02D;
}

* {
  font-size: 1.4rem;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.4rem;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-variation-settings: "wght" 400;
  background-color: var(--background-main);
}

::-webkit-scrollbar {
    width: .6rem;
    height: .6rem;
}

::-webkit-scrollbar-thumb {
    background: #9E9E9E; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
}

::-webkit-scrollbar-track {
    background: #D9D9D9;  /*스크롤바 뒷 배경 색상*/
}
`

export default GlobalStyle
