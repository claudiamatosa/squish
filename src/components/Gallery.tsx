import * as React from 'react';
import { useAsync } from 'react-async-hook';
import styled from 'styled-components';

import shuffle from '../utils/shuffle';

export interface GalleryProps {

}

const Gallery = styled.ul`
  line-height: 0;
  column-count: 1;
  column-gap: 10px;
  list-style: none;
  padding: 10px 0;
  margin: 0;

  @media (min-width: 400px) {
    column-count: 2;
  }

  @media (min-width: 768px) {
    column-count: 3;
  }

  @media (min-width: 1024px) {
    column-count: 4;
  }

  @media (min-width: 1308px) {
    column-count: 5;
  }
`;

const Item = styled.li`
  margin: 0 0 10px;
  padding: 0;
`;

const Image = styled.img`
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
          {shuffle(result).map((image: string) => (
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
