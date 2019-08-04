import * as React from 'react';

import Gallery from './Gallery';

export interface AppProps {
  compiler: string;
  framework: string;
}

const App = (props: AppProps) => (
  <>
    <h1>Squish</h1>
    <Gallery />
  </>
);

export default App;
