import * as React from 'react';
import { useAsync } from 'react-async-hook';
import styled from 'styled-components';

export interface GalleryProps {

}

const Gallery = styled.ul`
  line-height: 0;
  column-count: 4;
  column-gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  padding: 0;
  margin: 0;
`;

const Image = styled.img`
  margin-bottom: 10px;
  max-width: 100%;
`;

const fetchImageList = async () =>
  (await fetch(`/data/gallery.json`)).json();

const App = (props: GalleryProps) => {
  const { loading, error, result } = useAsync(fetchImageList, []);

  return (
    <section>
      {loading && <div>😸</div>}
      {error && <div>Error: {error.message}</div>}
      {result && (
        <Gallery>
          {result.map((image: string) => (
            <Item>
              <Image src={image} alt="" />
            </Item>
          ))}
        </Gallery>
      )}
    </section>
  )
};

export default App;
