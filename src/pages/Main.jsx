import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Header from '../components/Header';
import Section from '../components/Section';

const Main = () => {
  const { popular, novelty, upcoming, searched } = useSelector(
    ({ games }) => games.filtered
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Header />
      <GameList>
        <Section title='Searched' array={searched} search />
        <Section title='Popular games' array={popular} />
        <Section title='New games' array={novelty} />
        <Section title='Upcoming games' array={upcoming} />
      </GameList>
    </motion.div>
  );
};

const GameList = styled(motion.ul)`
  padding: 0 5em;

  @media (max-width: 420px) {
    padding: 0 2.5em;
  }
`;

export default Main;
