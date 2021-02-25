import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Screenshot = ({ id, src, alt }) => {
  const [isView, setIsView] = useState(false);

  const handleClickView = () => {
    setIsView(true);
  };

  const handleClickShadow = () => {
    setIsView(false);
  };

  return (
    <>
      {isView ? (
        <Wrapper>
          <Shadow onClick={handleClickShadow} />
          <View src={src} alt={alt} layoutId={id} />
        </Wrapper>
      ) : (
        <Preview src={src} alt={alt} onClick={handleClickView} layoutId={id} />
      )}
    </>
  );
};

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

const Preview = styled(motion.img)``;

export default Screenshot;
