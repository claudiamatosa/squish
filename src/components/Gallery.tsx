import * as React from 'react';
import { useAsync } from 'react-async-hook';

export interface GalleryProps {

}

const fetchImageList = async () =>
  (await fetch(`/data/gallery.json`)).json();

const App = (props: GalleryProps) => {
  const { loading, error, result } = useAsync(fetchImageList, []);

  return (
    <section>
      {loading && <div>😸</div>}
      {error && <div>Error: {error.message}</div>}
      {result && result.map((image: string) => <p>{image}</p>)}
    </section>
  )
};

export default App;
