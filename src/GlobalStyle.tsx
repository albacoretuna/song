import { createGlobalStyle } from 'styled-components';

/**
 * Add all the global styles here.
 * This is like an old school css file that can affect all the app
 */

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background: black;
  }
  * {
    font-family: 'Montserrat', sans-serif;
   }
`;

export default GlobalStyle;
