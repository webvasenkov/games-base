import React from 'react';
import { imageResize } from '../util';
import { motion } from 'framer-motion';
import GameCard from '../components/GameCard';
import styled from 'styled-components';

const Section = ({ title, array, search }) => {
  const section = (
    <>
      <h2>{title}</h2>
      <Games>
        {array.length ? (
          array.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              slug={game.slug}
              name={game.name}
              rating={game.rating}
              platforms={game.platforms}
              released={game.released}
              image={imageResize(game.background_image, 640)}
            />
          ))
        ) : (
          <NotFound>Nothing found :(</NotFound>
        )}
      </Games>
    </>
  );

  return <section>{search ? array.length ? section : <></> : section}</section>;
};

export default Section;

const Games = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 3em;
  grid-row-gap: 5em;
  margin-bottom: 5em;

  @media (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    grid-row-gap: 3em;
    margin-bottom: 3em;
  }
`;

const NotFound = styled.h3`
  color: #aaa;
`;
