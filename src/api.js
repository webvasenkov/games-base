import axios from 'axios';
import { lastYear, currentDate, nextYear } from './util';

const instance = axios.create({
  baseURL: 'https://api.rawg.io/api/',
});

class API {
  popularGames() {
    return instance(`games?dates=${lastYear},${currentDate}&ordering=-raring&page_size=10`);
  }

  noveltyGames() {
    return instance(`games?dates=${currentDate},${nextYear}&ordering=-added&page_size=10`);
  }

  upcomingGames() {
    return instance(`games?dates=${lastYear},${currentDate}&ordering=-released&page_size=10`);
  }
}

export const api = new API();
