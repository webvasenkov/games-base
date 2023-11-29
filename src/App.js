import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from './redux/reducers/games';
import GlobalStyles from './components/GlobalStyles';
import Preloader from './components/Preloader';
import Main from './pages/Main';
import GameDetail from './pages/GameDetail';

const App = () => {
  const dispatch = useDispatch();
  const { all: games, isLoading } = useSelector(({ games }) => games);

  useEffect(() => {
    if (!games.length) {
      dispatch(getGames());
    }
  }, []);

  return (
    <>
      {isLoading && <Preloader />}
      {!isLoading && (
        <div className='app'>
          <GlobalStyles />
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route path='/:slug' element={<GameDetail />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
