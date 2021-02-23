import { api } from '../../api';

const FETCH = 'games/fetch';

const initialState = {
  all: [],
  popular: [],
  novelty: [],
  upcoming: [],
};

const games = (state = initialState, action) => {
  switch (action.type) {
    case FETCH: {
      const payload = (key) => ({ [key]: action.payload[key] });
      return {
        ...state,
        ...payload('all'),
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
  type: FETCH,
  payload,
});

export const getGames = () => async (dispatch) => {
  const popular = await api.popularGames();
  const novelty = await api.noveltyGames();
  const upcoming = await api.upcomingGames();

  const payload = {
    all: [...popular.data.results, ...novelty.data.results, ...upcoming.data.results],
    popular: popular.data.results,
    novelty: novelty.data.results,
    upcoming: upcoming.data.results,
  };

  dispatch(fetchGames(payload));
};
