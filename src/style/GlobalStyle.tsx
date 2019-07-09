import { createGlobalStyle } from 'styled-components';

/**
 * Add all the global styles here.
 * This is like an old school css file that can affect all the app
 */

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: black;
  }
  * {
    font-family: 'Montserrat', sans-serif;
   }

   div#root {
     min-height: 100%;
   }
`;

export default GlobalStyle;
