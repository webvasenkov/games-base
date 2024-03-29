import { api } from '../../api';

const FETCH_DETAIL = 'game/fetch_detail';
const FETCH_SCREENSHOTS = 'game/fetch_screenshots';
const IS_LOADING = `game/is_loading`;

const initialState = {
  detail: null,
  screenshots: null,
  isLoading: true,
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DETAIL:
      return { ...state, detail: action.payload };
    case FETCH_SCREENSHOTS:
      return { ...state, screenshots: action.payload };
    case IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
};

export default game;

const fetchDetail = (payload) => ({
  type: FETCH_DETAIL,
  payload,
});

const fetchScreenshots = (payload) => ({
  type: FETCH_SCREENSHOTS,
  payload,
});

const isLoading = (isLoading) => ({
  type: IS_LOADING,
  isLoading,
});

export const getDetail = (slug) => async (dispatch) => {
  dispatch(isLoading(true));
  const { data: detail } = await api.gameDetails(slug);
  const { data: screenshots } = await api.gameScreenshots(slug);

  dispatch(fetchDetail(detail));
  dispatch(fetchScreenshots(screenshots));
  dispatch(isLoading(false));
};
