import { api } from '../../api';

const FETCH_GAMES = 'games/fetch_games';

const initialState = {
  popular: [],
  novelty: [],
  upcoming: [],
};

const games = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GAMES: {
      const payload = (key) => ({ [key]: action.payload[key] });
      return {
        ...state,
        ...payload('popular'),
        ...payload('novelty'),
        ...payload('upcoming'),
      };
    }
    default:
      return state;
  }
};

export default games;

const fetchGames = (payload) => ({
  type: FETCH_GAMES,
  payload,
});

export const getGames = () => async (dispatch) => {
  const popular = await api.popularGames();
  const novelty = await api.noveltyGames();
  const upcoming = await api.upcomingGames();

  const payload = {
    popular: popular.data.results,
    novelty: novelty.data.results,
    upcoming: upcoming.data.results,
  };

  dispatch(fetchGames(payload));
};
