import * as React from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import { parse, stringify } from 'query-string';

import Overlay from './Overlay';
import { useBreakpoints } from '../config/breakpoints';
import useGalleryData from '../data/useGalleryData';

export interface GalleryProps {
 
}

interface Image {
  width: Number,
  height: Number,
  thumbnail: string,
  path: string,
  id: Number 
}

export const columnCount = {
  mini: 1,
  small: 2,
  medium: 3,
  desktop: 4,
  wide: 5
}

const Wrapper = styled.ul`
  line-height: 0;
  column-count: 1;
  column-gap: 0;
  list-style: none;
  padding: 5px;
  margin: 0;

  ${useBreakpoints('column-count', columnCount)}
`;

const Loading = styled.div`
  padding: 50px;
  text-align: center;
  font-size: 50px;
`;

const Item = styled.li`
  margin: 0 10px 20px 10px;
  padding: 0;
`;

const ImageLink = styled.a<{ readonly selected: boolean }>`
  position: relative;
  text-decoration: none;
  margin: 0;
  padding: 0;
  display: block;
  transition: filter 0.5s ease-in-out;
  filter: ${props => props.selected ? 'saturate(20%)' : 'none' };
  z-index: 10;

  &:hover, &:focus {
    filter: saturate(200%) invert(10%) contrast(120%);
    z-index: 50;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: block;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%;
  height: auto;
  z-index: 100;
`;

const buildImageUrl = (image: Number): string => {
  const pathname = window.location.pathname;
  const params = parse(window.location.search);
  const newParams = stringify({
    ...params,
    view: image
  });

  return `${pathname}?${newParams}`;
};

const setView = (image: Number | null): void => {
  window.history.pushState({}, "", buildImageUrl(image));
};

const Placeholder = ({ image: { height, width } }: { image: Image }) => (
  <svg
    style={{
      backgroundColor: 'gray',
      width: '100%',
      height: 'auto'
    }}
    width={`${width}px`}
    height={`${height}px`}
    viewBox={`0 0 ${width} ${height}`}
  >
    <path d="M0 0h48v1H0z" fill="transparent" fillRule="evenodd" />
  </svg>
)

const Gallery = (props: GalleryProps) => {
  const { loading, error, images } = useGalleryData();
  const [selectedImage, selectImage] = React.useState(null);

  React.useEffect(() => {
    const { view } = parse(window.location.search);
    if (images && typeof view !== 'undefined') {
      const selected = images.find((image: Image) => image.id.toString() === view);
      selected && selectImage(selected.id);
    };
  }, [images]);

  if (loading) return <Loading>😸</Loading>;
  if (error) return <div>Error: {error.message}</div>;

  if (images) {
    return (
      <>
        <Wrapper>
          {images.map((image: Image) => (
            <Item>
              <ImageLink
                href={buildImageUrl(image.id)}
                selected={selectedImage === image.id}
                onClick={(e) => {
                  e.preventDefault();
                  setView(image.id);
                  selectImage(image.id);
                }}
              >
                <ImageContainer>
                  <Placeholder image={image} />

                  <LazyLoad offset={100}>
                    <Image
                      src={image.thumbnail}
                      alt=""
                      width={image.width.toString()}
                      height={image.height.toString()}
                    />
                  </LazyLoad>
                </ImageContainer>
              </ImageLink>
            </Item>
          ))}
        </Wrapper>

        <Overlay
          imageUrl={selectedImage && images.find((image: Image) => image.id === selectedImage).path}
          next={() => {
            if (!selectedImage) return;
            const currentImage = images.findIndex((image: Image) => image.id === selectedImage);
            const nextImage = currentImage === images.length - 1 ? 0 : currentImage + 1;
            setView(images[nextImage].id);
            selectImage(images[nextImage].id);
          }}
          previous={() => {
            if (!selectedImage) return;
            const currentImage = images.findIndex((image: Image) => image.id === selectedImage);
            const previousImage = currentImage < 1 ? images.length - 1 : currentImage - 1;
            setView(images[previousImage].id);
            selectImage(images[previousImage].id);
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
