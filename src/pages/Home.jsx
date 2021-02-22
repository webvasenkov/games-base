import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getGames } from '../redux/reducers/games';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
