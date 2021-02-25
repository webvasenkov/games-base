import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from './redux/reducers/games';
import GlobalStyles from './components/GlobalStyles';
import Preloader from './components/Preloader';
import Main from './pages/Main';
import GameDetail from './pages/GameDetail';

const App = () => {
  const dispatch = useDispatch();
  const { all: games } = useSelector(({ games }) => games);

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  if (!games.length) {
    return <Preloader />;
  }

  return (
    <div className='app'>
      <GlobalStyles />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route
          path='/:slug'
          render={({ match }) => {
            let gameId;
            games.forEach((game) => {
              if (game.slug === match.params.slug) {
                gameId = game.id;
              }
            });
            return <GameDetail gameId={gameId} />;
          }}
        />
      </Switch>
    </div>
  );
};

export default App;
