import { api } from '../../api';

const FETCH = 'games/fetch';
const SEARCH = 'game/search';
const RESET_SEARCH = 'game/reset_search';

const initialState = {
  all: [],
  popular: [],
  novelty: [],
  upcoming: [],
  searched: [],
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
    case SEARCH:
      return { ...state, searched: action.payload };
    case RESET_SEARCH:
      return { ...state, searched: [] };
    default:
      return state;
  }
};

export default games;

const fetchGames = (payload) => ({
  type: FETCH,
  payload,
});

const search = (payload) => ({
  type: SEARCH,
  payload,
});

export const resetSearch = () => ({
  type: RESET_SEARCH,
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

export const getSearch = (name) => async (dispatch) => {
  const searched = await api.gameSearch(name);
  dispatch(search(searched.data.results));
};
