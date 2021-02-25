import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { imageResize } from '../util';
import styled from 'styled-components';
import Header from '../components/Header';
import GameCard from '../components/GameCard';

const Main = () => {
  const { popular, novelty, upcoming, searched } = useSelector(({ games }) => games);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Header />
      <GameList>
        {searched.length ? (
          <>
            <h2>Searched games</h2>
            <Games>
              {searched.map((game) => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  slug={game.slug}
                  name={game.name}
                  released={game.released}
                  image={imageResize(game.background_image, 640)}
                />
              ))}
            </Games>
            <h2>Popular games</h2>
            <Games>
              {popular.map((game) => (
                <GameCard
                  key={game.id}
                  id={game.id}
                  slug={game.slug}
                  name={game.name}
                  released={game.released}
                  image={imageResize(game.background_image, 640)}
                />
              ))}
            </Games>
          </>
        ) : (
          <></>
        )}

        <h2>New games</h2>
        <Games>
          {novelty.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              slug={game.slug}
              name={game.name}
              released={game.released}
              image={imageResize(game.background_image, 640)}
            />
          ))}
        </Games>
        <h2>Upcoming games</h2>
        <Games>
          {upcoming.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              slug={game.slug}
              name={game.name}
              released={game.released}
              image={imageResize(game.background_image, 640)}
            />
          ))}
        </Games>
      </GameList>
    </motion.div>
  );
};

const GameList = styled(motion.div)`
  padding: 0 5em;
`;

const Games = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 3em;
  grid-row-gap: 5em;
  margin-bottom: 5em;
`;
export default Main;
