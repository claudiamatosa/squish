import * as React from 'react';
import styled from 'styled-components';
import { parse, stringify } from 'query-string';

import Overlay from './Overlay';
import useGalleryData from '../data/useGalleryData';

export interface GalleryProps {
 
}

const Wrapper = styled.ul`
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

const ImageLink = styled.a`
  text-decoration: none;
  margin: 0;
  padding: 0;
  display: block;
`;

const Image = styled.img`
  max-width: 100%;
`;

const buildImageUrl = (image: string): string => {
  const pathname = window.location.pathname;
  const params = parse(window.location.search);
  const newParams = stringify({
    ...params,
    view: image
  });

  return `${pathname}?${newParams}`;
};

const setView = (image: string | null): void => {
  window.history.pushState({}, "", buildImageUrl(image));
};

const fetchImageList = async () =>
  (await fetch(`/data/gallery.json`)).json();

const Gallery = (props: GalleryProps) => {
  const { loading, error, images } = useGalleryData();
  const [selectedImage, selectImage] = React.useState(null);

  React.useEffect(() => {
    const { view } = parse(window.location.search);
    if (view) { selectImage(view) };
  }, []);

  if (loading) return <div>😸</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (images) {
    return (
      <>
        <Wrapper>
          {images.map((image: string) => (
            <Item>
              <ImageLink
                href={buildImageUrl(image)}
                onClick={(e) => {
                  e.preventDefault();
                  setView(image);
                  selectImage(image);
                }}
              >
                <Image src={image} alt="" />
              </ImageLink>
            </Item>
          ))}
        </Wrapper>

        <Overlay
          imageUrl={selectedImage}
          next={() => {
            if (!selectedImage) return;
            const currentImage = images.findIndex(selectedImage);
            const nextImage = currentImage < images.length - 1 ? 0 : currentImage + 1;
            setView(images[nextImage]);
            selectImage(images[nextImage]);
          }}
          previous={() => {
            if (!selectedImage) return;
            const currentImage = images.findIndex(selectedImage);
            const previousImage = currentImage < 1 ? images.length - 1 : currentImage - 1;
            setView(images[previousImage]);
            selectImage(images[previousImage]);
          }}
          close={() => {
            setView(null);
            selectImage(null);
          }}
        />
      </>
    );
  }

  return null;
};

export default Gallery;
