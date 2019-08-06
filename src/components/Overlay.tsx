import * as React from 'react';
import styled from 'styled-components';

export interface OverlayProps {
  next: () => void,
  previous: () => void,
  close: () => void,
  imageUrl: string | null
}

const Wrapper = styled.div`
  z-index: 1000;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 20px;
`;

const Image = styled.img`
  max-width: 100%;
`;

const Overlay = ({ imageUrl }: OverlayProps) => {
  return imageUrl ? (
    <Wrapper>
      <Image src={imageUrl} alt="" />
    </Wrapper>
  ): null
};

export default Overlay;
