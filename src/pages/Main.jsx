import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import GameCard from '../components/GameCard';

const Main = () => {
  const { popular, novelty, upcoming } = useSelector(({ games }) => games);

  return (
    <GameList>
      <h2>Popular games</h2>
      <Games>
        {popular.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            slug={game.slug}
            name={game.name}
            released={game.released}
            image={game.background_image}
          />
        ))}
      </Games>
      <h2>New games</h2>
      <Games>
        {novelty.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            slug={game.slug}
            name={game.name}
            released={game.released}
            image={game.background_image}
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
            image={game.background_image}
          />
        ))}
      </Games>
    </GameList>
  );
};

const GameList = styled(motion.div)`
  padding: 0 5em;
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 3em;
  grid-row-gap: 5em;
`;
export default Main;
