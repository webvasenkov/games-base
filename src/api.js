import axios from 'axios';
import { lastYear, currentDate, nextYear } from './util';

const instance = axios.create({
  baseURL: 'https://api.rawg.io/api/',
  params: { key: '0c833a938cac4943b4da236f171cba87' },
});

class API {
  popularGames() {
    return instance(`games?dates=${lastYear},${currentDate}&page_size=10`);
  }

  noveltyGames() {
    return instance(
      `games?dates=${currentDate},${nextYear}&ordering=-added&page_size=10`,
    );
  }

  upcomingGames() {
    return instance(
      `games?dates=${lastYear},${currentDate}&ordering=-released&page_size=10`,
    );
  }

  gameDetails(slug) {
    return instance(`games/${slug}`);
  }

  gameScreenshots(slug) {
    return instance(`games/${slug}/screenshots`);
  }

  gameSearch(name) {
    return instance(`games?search=${name}&page_size=10`);
  }
}

export const api = new API();
