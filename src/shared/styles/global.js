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
`

export default GlobalStyle
