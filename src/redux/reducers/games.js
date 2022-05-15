import { api } from '../../api';

const FETCH = 'games/fetch';
const SEARCH = 'games/search';
const RESET_SEARCH = 'games/reset_search';
const FILTER = 'games/filter';

const initialState = {
  all: [],
  popular: [],
  novelty: [],
  upcoming: [],
  searched: [],
  filtered: {
    all: [],
    popular: [],
    novelty: [],
    upcoming: [],
    searched: [],
  },
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
    case FILTER: {
      const filterPlatform = (key) => {
        if (action.slug === 'all') {
          return { [key]: state[key] };
        }

        const searchPlatform = (item) => {
          return item.platforms.some(({platform}) => platform.slug === action.slug);
        };

        return {
          [key]: state[key].filter((item) => searchPlatform(item) && item),
        };
      };

      return {
        ...state,
        filtered: {
          ...filterPlatform('all'),
          ...filterPlatform('popular'),
          ...filterPlatform('novelty'),
          ...filterPlatform('upcoming'),
          ...filterPlatform('searched'),
        },
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

const search = (payload) => ({
  type: SEARCH,
  payload,
});

export const resetSearch = () => ({
  type: RESET_SEARCH,
});

export const filterGames = (name) => {
  let slug = '';

  switch (name) {
    case 'All':
      slug = 'all';
      break;
    case 'Windows':
      slug = 'pc';
      break;
    case 'PlayStation':
      slug = 'playstation5';
      break;
    case 'Xbox':
      slug = 'xbox-one';
      break;
    case 'Nintendo':
      slug = 'nintendo-switch';
      break;
    case 'iOS':
      slug = 'ios';
      break;
    case 'Android':
      slug = 'android';
      break;
    case 'Web':
      slug = 'web';
      break;
    case 'Linux':
      slug = 'linux';
      break;
    default:
      break;
  }
  return {
    type: FILTER,
    slug,
  };
};

export const getGames = () => async (dispatch) => {
  const popular = await api.popularGames();
  const novelty = await api.noveltyGames();
  const upcoming = await api.upcomingGames();

  const payload = {
    all: [
      ...popular.data.results,
      ...novelty.data.results,
      ...upcoming.data.results,
    ],
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
