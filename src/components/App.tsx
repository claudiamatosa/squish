import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

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

const Title = styled.h1`
  font-family: pt-sans-narrow;
  font-weight: 600;
  text-align: center;
  font-size: 50px;
`;

const App = (props: AppProps) => (
  <>
    <Title>You squish the life out of me</Title>
    <Gallery />
    <GlobalStyle />
  </>
);

export default App;
