import * as React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

import Gallery from './Gallery';

export interface AppProps {
  compiler: string;
  framework: string;
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F1F1F1;
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
  0%   { transform: scale(1,1); color: #777777; }
  10%  { transform: scale(1.2,.9); }
  30%  { transform: scale(.9,1.1); }
  50%  { transform: scale(1.05,.95); color: #ED8B36; }
  57%  { transform: scale(1,1); }
  64%  { transform: scale(1,1); }
  100% { transform: scale(1,1); color: #777777; }
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
  animation: ${titleAnimation} 1.5s cubic-bezier(0.280, 0.840, 0.420, 1);
  display: inline-block;
  animation-delay: 3s;
`;

const App = (props: AppProps) => (
  <>
    <GlobalStyle />
    <Title>you <Squish>squish</Squish> the life out of me</Title>
    <Gallery />
  </>
);

export default App;
