import * as React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

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

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`

const titleAnimation = keyframes`
  0% {
    color: #777777;
    transform: scale(1);
  }

  14% {
    transform: scale(1.3);
  }

  28% {
    color: #ED8B36;
    transform: scale(1);
  }

  42% {
    transform: scale(1.3);
  }

  70% {
    color: #777777;
    transform: scale(1);
  }
`;

const Title = styled.h1`
  font-family: pt-sans-narrow;
  font-weight: 600;
  text-align: center;
  font-size: 50px;
  color: #777777;
  padding: 0 20px;
  line-height: 1;
`;

const Squish = styled.span`
  text-transform: uppercase;
  color: #667705;
  animation: ${titleAnimation} 4s ease-in-out;
  display: inline-block;
`;

const App = (props: AppProps) => (
  <>
    <GlobalStyle />
    <Title>you <Squish>squish</Squish> the life out of me</Title>
    <Gallery />
  </>
);

export default App;
