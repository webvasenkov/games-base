import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDetail } from '../redux/reducers/game';
import { ReactComponent as Windows } from '../assets/windows.svg';
import { ReactComponent as PlayStation } from '../assets/play-station.svg';
import { ReactComponent as Xbox } from '../assets/xbox.svg';
import { ReactComponent as Star } from '../assets/star.svg';
import { ReactComponent as StarEmpty } from '../assets/star-empty.svg';
import { imageResize } from '../util';
import Preloader from '../components/Preloader';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const GameDetail = ({ gameId }) => {
  const dispatch = useDispatch();
  const { detail, screenshots, isLoading } = useSelector(({ game }) => game);
  const [platforms, setPlatforms] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    dispatch(getDetail(gameId));
  }, [dispatch, gameId]);

  useEffect(() => {
    const platform = new Set();

    if (isLoading) {
      const rating = Math.round(detail.rating);

      detail.platforms.forEach(({ platform: item }) => {
        const words = item.name.split(' ');
        platform.add(words[0].toLowerCase());
      });

      setPlatforms([...platform]);

      if (stars.length !== 5) {
        for (let i = 1; i <= 5; i++) {
          if (rating >= i) {
            setStars((prevStars) => [...prevStars, <Star />]);
          } else {
            setStars((prevStars) => [...prevStars, <StarEmpty />]);
          }
        }
      }
    }
  }, [isLoading, detail, stars]);

  const getPlatform = (platform) => {
    switch (platform) {
      case 'pc':
        return <Windows />;
      case 'playstation':
        return <PlayStation />;
      case 'xbox':
        return <Xbox />;
      default:
        return;
    }
  };

  if (!isLoading) {
    return <Preloader />;
  }

  return (
    <Container>
      <Overlay>
        <Background src={imageResize(detail.background_image, 1280)} alt={detail.name} />
        <Hero>
          <h3>{detail.name}</h3>
          <Rating>
            {stars.map((star, i) => (
              <React.Fragment key={i}>{star}</React.Fragment>
            ))}
          </Rating>
          <Platforms>
            {platforms.map((platform) => (
              <React.Fragment key={platform}>{getPlatform(platform)}</React.Fragment>
            ))}
          </Platforms>
        </Hero>
      </Overlay>
      <About>
        <h4>About</h4>
        <p>{detail.description_raw}</p>
      </About>

      <Screenshots>
        <h4>Screenshots</h4>
        <ScreenshotsWrapper>
          {screenshots.results.map((screenshot) => (
            <Screenshot key={screenshot.id}>
              <img src={imageResize(screenshot.image, 640)} alt={detail.name} />
            </Screenshot>
          ))}
        </ScreenshotsWrapper>
      </Screenshots>
    </Container>
  );
};

export default GameDetail;

const Container = styled.div`
  h4 {
    font-size: 2.5rem;
  }
`;
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

  h3 {
    font-size: 5rem;
    text-align: center;
    line-height: 1;
  }
`;

const Rating = styled.div`
  svg {
    fill: #222;
    height: 1.5em;
    margin: 1.5em 0.5em;
  }
`;

const Platforms = styled.div`
  svg {
    fill: #222;
    height: 2em;
    margin: 0 1em;
  }
`;

const About = styled.div`
  max-width: 80%;
  margin: 2em auto;
  text-align: center;

  p {
    font-size: 1.5rem;
    font-weight: 200;
    line-height: 1.7;
  }
`;

const Screenshots = styled.div`
  h4 {
    text-align: center;
  }
`;

const ScreenshotsWrapper = styled.div`
  margin-top: 2em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Screenshot = styled.div`
  overflow: hidden;

  img {
    display: block;
    transform: scale(1.2);
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    img {
      transform: scale(1);
    }
  }
`;
