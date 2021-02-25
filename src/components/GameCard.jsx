import React from 'react';
import { useDispatch } from 'react-redux';
import { getDetail } from '../redux/reducers/game';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GameCard = ({ id, slug, name, image }) => {
  const dispatch = useDispatch();

  const handleClickCard = () => {
    dispatch(getDetail(id));
  };

  return (
    <Game onClick={handleClickCard}>
      <Link to={slug}>
        <ImageWrapper>
          <img src={image} alt={name} />
        </ImageWrapper>
        <GameDescription>
          <h3>{name}</h3>
        </GameDescription>
      </Link>
    </Game>
  );
};

const Game = styled(motion.div)`
  min-height: 30vh;
  border-radius: 1em;
  box-shadow: 0px 0px 1px 1px #eee;
  background: #fff;
  transition: all 0.25s ease-in-out;
  overflow: hidden;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: 40vh;
    object-fit: cover;
    z-index: 1;
    transition: all 0.25s ease-in-out;
    object-position: center;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }

    transform: translateY(-2%);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
`;

const GameDescription = styled.div`
  padding: 1em;
  text-align: center;
  z-index: 2;
`;

export default GameCard;
