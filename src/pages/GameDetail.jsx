import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDetail } from '../redux/reducers/game';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const GameDetail = ({ gameId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(gameId));
  }, [dispatch, gameId]);

  const { detail, screenshots } = useSelector(({ game }) => game);

  if (!detail || !screenshots) {
    return 'Loading';
  }

  return (
    <Container>
      <Overlay>
        <Background src={detail.background_image} alt={detail.name} />
        <Hero>
          <Title>{detail.name}</Title>
          <span>{detail.rating}</span>
        </Hero>
        <Platforms>
          {detail.platforms.map((platform) => (
            <span key={platform.id}>{platform.name}</span>
          ))}
        </Platforms>
      </Overlay>
      <About>
        <AboutTitle>About</AboutTitle>
        <AboutParagraph>{detail.description}</AboutParagraph>
      </About>

      <Screenshots>
        {screenshots.results.map((screenshot) => (
          <img key={screenshot.id} src={screenshot.image} alt={detail.name} />
        ))}
      </Screenshots>
    </Container>
  );
};

export default GameDetail;

const Container = styled.div``;
const Background = styled.img`
  height: 80vh;
  width: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(255, 255, 255, 0.1), rgb(245, 245, 245));
  }
`;

const Hero = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 5rem;
`;

const Platforms = styled.div``;
const About = styled.div``;
const AboutTitle = styled.h4`
  font-size: 2.5rem;
`;
const AboutParagraph = styled.p``;

const Screenshots = styled.div``;
