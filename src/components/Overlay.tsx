import * as React from 'react';
import styled, { css } from 'styled-components';

export interface OverlayProps {
  next: () => void,
  previous: () => void,
  close: () => void,
  imageUrl: string | null
}

const innerPadding = 20;

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
  background-color: rgba(0, 0, 0, 0.8);
`;

const Image = styled.img`
  flex: 0 0 auto;
  max-height: calc(100vh - ${innerPadding * 2}px);
  max-width: calc(100vw - ${innerPadding * 2}px);
  position: relative;
  z-index: 10;
`;

const ClearButtton = css`
  appearance: none;
  text-decoration: none;
  margin: 0;
  padding: 0;
  display: block;
  z-index: 50;
  cursor: pointer;
  border: none;
  background-color: transparent;

  &::before {
    display: block;
    content: '>';
    font-family: pt-sans;
    font-weight: 700;
    font-size: 50px;
    padding: 10px 20px;
    color: white;
    text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
  }
`;

const Close = styled.button`
  ${ClearButtton};
  position: absolute;
  top: 20px;
  right: 20px;

  &::before {
    content: 'x';
  }
`;

const Previous = styled.button`
  ${ClearButtton};
  position: absolute;
  top: calc(50vh - 25px);
  left: 20px;

  &::before {
    content: '<';
  }
`;

const Next = styled.button`
  ${ClearButtton};
  position: absolute;
  top: calc(50vh - 25px);
  right: 20px;

  &::before {
    content: '>';
  }
`;

const Overlay = ({ next, previous, close, imageUrl }: OverlayProps) => {
  return imageUrl ? (
    <Wrapper>
      <Close onClick={(e) => {
        e.preventDefault();
        close();
      }} />

      <Previous onClick={(e) => {
        e.preventDefault();
        previous();
      }} />

      <Image src={imageUrl} alt="" />

      <Next onClick={(e) => {
        e.preventDefault();
        next();
      }} />
    </Wrapper>
  ): null
};

export default Overlay;
