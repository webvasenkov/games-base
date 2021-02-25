import React from 'react';
import { ReactComponent as Gamepad } from '../assets/gamepad.svg';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const Preloader = () => {
  return (
    <>
      <GlobalStyle />
      <PreloaderStyled>
        <GamePadStyled />
      </PreloaderStyled>
    </>
  );
};

export default Preloader;

const pulse = keyframes`
  0% {
    transform: scale(0.9);
    opacity: 0.9;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(0.9);
    opacity: 0.9;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const PreloaderStyled = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GamePadStyled = styled(Gamepad)`
  animation: ${pulse} 0.2s ease-in infinite;
  width: 5em;
  fill: #222;
`;
