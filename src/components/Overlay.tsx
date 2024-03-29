import * as React from 'react';
import styled, { css } from 'styled-components';

import { useBreakpoints } from '../config/breakpoints';

export interface OverlayProps {
  next: () => void,
  previous: () => void,
  close: () => void,
  imageUrl: string | null
}

interface Image {
  width: Number,
  height: Number,
  path: string,
  thumbnail: string,
  id: Number 
}

const innerPadding = {
  small: '0',
  medium: '20px',
  desktop: '30px'
};

const buttonMargin = {
  small: '5px',
  medium: '10px',
  desktop: '15px'
};

const Wrapper = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(30, 30, 30, 0.8);
  background-image: url('/static/images/loader.svg');
  background-repeat: no-repeat;
  background-position: center center;

  ${useBreakpoints('padding', innerPadding)}
`;

const Image = styled.img`
  flex: 0 0 auto;
  max-height: 100%;
  max-width: 100%;
  position: relative;
  z-index: 10;
`;

const ClearButton = css`
  appearance: none;
  text-decoration: none;
  margin: 0;
  padding: 0;
  display: inline-block;
  line-height: 1;
  padding: 0;
  z-index: 50;
  cursor: pointer;
  border: none;
  background-color: transparent;
  height: auto;
  width: auto;

  &::before {
    display: block;
    content: '>';
    font-family: 'Indie Flower', cursive;
    font-weight: 600;
    font-size: 50px;
    padding: 0 5px;
    color: white;
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
  }
`;

const Close = styled.button`
  ${ClearButton};
  position: absolute;
  
  ${useBreakpoints('top', buttonMargin)}
  ${useBreakpoints('right', buttonMargin)}

  &::before {
    content: 'x';
    font-size: 30px;
  }
`;

const Previous = styled.button`
  ${ClearButton};
  position: absolute;
  top: calc(50vh - 25px);

  ${useBreakpoints('left', buttonMargin)}

  &::before {
    content: '<';
  }
`;

const Next = styled.button`
  ${ClearButton};
  position: absolute;
  top: calc(50vh - 25px);

  ${useBreakpoints('right', buttonMargin)}

  &::before {
    content: '>';
  }
`;

interface KeyboardActions {
  ArrowLeft: () => void,
  ArrowRight: () => void,
  Escape: () => void
}

const Overlay = ({ next, previous, close, imageUrl }: OverlayProps) => {
  const wrapper = React.useRef(null);
  const [ imageSrc, setImageSrc ] = React.useState(null);

  React.useEffect(() => {
    wrapper.current && wrapper.current.focus();
  });

  React.useEffect(() => {
    setImageSrc('');
  }, [imageUrl]);

  React.useEffect(() => {
    setImageSrc(imageUrl)
  }, [imageSrc])
  
  const keyEvents: KeyboardActions = {
    ArrowLeft: previous,
    ArrowRight: next,
    Escape: close
  };

  const keyUp = ({ key }: React.KeyboardEvent) => {
    const action = (keyEvents as any)[key];
    if (action) action();
  };

  return imageUrl ? (
    <Wrapper tabIndex={0} onKeyUp={keyUp} ref={wrapper}>
      <Close onClick={close} title="Close" />
      <Previous onClick={previous} title="Previous image" />
      <Image src={imageSrc} alt="" />
      <Next onClick={next} title="Next image" />
    </Wrapper>
  ): null
};

export default Overlay;
