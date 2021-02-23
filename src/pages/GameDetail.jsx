import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDetail } from '../redux/reducers/game';
import { ReactComponent as PC } from '../assets/pc.svg';
import { ReactComponent as PlayStation } from '../assets/play-station.svg';
import { ReactComponent as Xbox } from '../assets/xbox.svg';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const GameDetail = ({ gameId }) => {
  const dispatch = useDispatch();
  const { detail, screenshots } = useSelector(({ game }) => game);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    dispatch(getDetail(gameId));
  }, [dispatch, gameId]);

  useEffect(() => {
    const platform = new Set();

    if (detail) {
      detail.platforms.forEach(({ platform: item }) => {
        const words = item.name.split(' ');
        platform.add(words[0].toLowerCase());
      });

      setPlatforms([...platform]);
    }
  }, [detail]);

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

          <Platforms>
            {platforms.map((platform) => {
              switch (platform) {
                case 'pc':
                  return <PC />;
                case 'playstation':
                  return <PlayStation />;
                case 'xbox':
                  return <Xbox />;
                default:
                  return <></>;
              }
            })}
          </Platforms>
        </Hero>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 5rem;
`;

const Platforms = styled.div`
  svg {
    fill: #222;
    height: 2em;
    margin: 1em;
  }
`;
const About = styled.div``;
const AboutTitle = styled.h4`
  font-size: 2.5rem;
`;
const AboutParagraph = styled.p``;

const Screenshots = styled.div``;
