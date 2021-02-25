import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { imageResize } from '../util';
import styled from 'styled-components';

const Screenshot = ({ id, src, alt }) => {
  const [isView, setIsView] = useState(false);

  const handleClickView = () => {
    setIsView(true);
  };

  const handleClickShadow = () => {
    setIsView(false);
  };

  const path = imageResize(src, 1280);

  return (
    <Container>
      {isView ? (
        <Wrapper>
          <Shadow onClick={handleClickShadow} />
          <View src={path} alt={alt} layoutId={id} />
        </Wrapper>
      ) : (
        <PreviewWrapper layoutId={id}>
          <Preview src={path} alt={alt} onClick={handleClickView} />
        </PreviewWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
`;

const Shadow = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
`;

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const View = styled(motion.img)`
  max-width: 80%;
  max-height: 80vh;
  object-fit: cover;
  z-index: 2;
`;

const PreviewWrapper = styled(motion.div)`
  height: 100%;
`;

const Preview = styled(motion.img)`
  cursor: pointer;
  transition: all 0.2s ease-out;
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;

  &:hover {
    transform: scale(1.1);
  }
`;

export default Screenshot;
