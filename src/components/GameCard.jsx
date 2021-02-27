import React from 'react';
import { useDispatch } from 'react-redux';
import { getDetail } from '../redux/reducers/game';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { generateStars, generatePlatforms } from '../util';
import styled from 'styled-components';

const GameCard = ({ id, slug, name, image, rating, platforms, released }) => {
  const dispatch = useDispatch();

  const handleClickCard = () => {
    dispatch(getDetail(id));
  };

  return (
    <Game onClick={handleClickCard}>
      <Link to={slug}>
        <ImageWrapper>
          <Overlay>
            <Rating>{generateStars(rating)}</Rating>
            <Platforms>{generatePlatforms(platforms)} </Platforms>
            <Released>{released?.slice(0, 4)}</Released>
          </Overlay>
          <img src={image} alt={name} />
        </ImageWrapper>
        <GameDescription>
          <h3>{name}</h3>
        </GameDescription>
      </Link>
    </Game>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  padding: 1em;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.25s ease-in-out;
`;

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
      filter: blur(2px) brightness(0.5);
    }

    transform: translateY(-2%);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.15);

    ${Overlay} {
      opacity: 1;
    }
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  position: relative; ;
`;

const GameDescription = styled.div`
  padding: 1em;
  text-align: center;
  z-index: 2;
`;

const Rating = styled.div`
  svg {
    fill: #fff;
    height: 1em;
    margin: 0 0.33em;
  }
`;

const Platforms = styled(Rating)`
  svg {
    margin: 0.33em 0.33em;
  }
`;

const Released = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
`;

export default GameCard;
