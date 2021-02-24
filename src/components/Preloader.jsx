import React from 'react';
import { ReactComponent as Gamepad } from '../assets/gamepad.svg';
import styled, { keyframes } from 'styled-components';

const Preloader = () => {
  return <GamePadStyled />;
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

const GamePadStyled = styled(Gamepad)`
  position: absolute;
  animation: ${pulse} 0.2s ease-in infinite;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 5%;
  fill: #222;
`;
