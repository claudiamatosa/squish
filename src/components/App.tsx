import * as React from 'react';
import { createGlobalStyle } from 'styled-components';

import Gallery from './Gallery';

export interface AppProps {
  compiler: string;
  framework: string;
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`

const App = (props: AppProps) => (
  <>
    <h1>Squish</h1>
    <Gallery />
    <GlobalStyle />
  </>
);

export default App;
