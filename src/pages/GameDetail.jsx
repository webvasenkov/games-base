import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDetail } from '../redux/reducers/game';
import { imageResize } from '../util';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { generatePlatforms, generateStars } from '../util';
import Preloader from '../components/Preloader';
import Screenshot from '../components/Screenshot';
import styled from 'styled-components';

const GameDetail = ({ gameId }) => {
  const dispatch = useDispatch();
  const { detail, screenshots, isLoading } = useSelector(({ game }) => game);

  useEffect(() => {
    dispatch(getDetail(gameId));
  }, [dispatch, gameId]);

  if (!isLoading) {
    return <Preloader />;
  }

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Overlay>
        <Background
          src={imageResize(detail.background_image, 1280)}
          alt={detail.name}
        />
        <Hero>
          <h3>{detail.name}</h3>
          <Rating>{generateStars(detail.rating)}</Rating>
          <Platforms>{generatePlatforms(detail.platforms)}</Platforms>
        </Hero>
      </Overlay>
      <About>
        <h4>About</h4>
        <Description dangerouslySetInnerHTML={{ __html: detail.description }} />
      </About>

      <Screenshots>
        <h4>Screenshots</h4>
        <ScreenshotsWrapper>
          <AnimateSharedLayout type='crossfade'>
            {screenshots.results.map((screenshot) => (
              <Screenshot
                key={screenshot.id}
                id={screenshot.id}
                src={screenshot.image}
                alt={detail.name}
              />
            ))}
          </AnimateSharedLayout>
        </ScreenshotsWrapper>
      </Screenshots>
    </Container>
  );
};

export default GameDetail;

const Container = styled(motion.div)`
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

  @media (max-width: 420px) {
    h3 {
      font-size: 2.5rem;
    }
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
`;

const Description = styled.div`
  text-align: left;
  margin-top: 2em;
  p {
    margin-bottom: 2em;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
