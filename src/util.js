import defaultBackground from './assets/default-background.png';
import { ReactComponent as Windows } from './assets/windows.svg';
import { ReactComponent as PlayStation } from './assets/play-station.svg';
import { ReactComponent as Xbox } from './assets/xbox.svg';
import { ReactComponent as Android } from './assets/android.svg';
import { ReactComponent as IOS } from './assets/ios.svg';
import { ReactComponent as Linux } from './assets/linux.svg';
import { ReactComponent as Nintendo } from './assets/nintendo.svg';
import { ReactComponent as Web } from './assets/web.svg';
import { ReactComponent as Star } from './assets/star.svg';
import { ReactComponent as StarEmpty } from './assets/star-empty.svg';

const getCurrentMonth = () => {
  const currentMonth = new Date().getMonth();
  return (currentMonth + 1).toString().padStart(2, '0');
};

const getCurrentDay = () => {
  const currentDay = new Date().getDate();
  return (currentDay + 1).toString().padStart(2, '0');
};

const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();

export const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

export const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;

export const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

export const imageResize = (path, size) => {
  if (!path) {
    return defaultBackground;
  }

  const newPath = path.match(/media\/screenshots/)
    ? path.replace('media/screenshots', `media/resize/${size}/-/screenshots`)
    : path.replace('media/games', `media/resize/${size}/-/games`);

  return newPath;
};

export const generatePlatforms = (platforms) => {
  const platform = new Set();

  platforms.forEach(({ platform: item }) => {
    const words = item.name.split(' ');
    platform.add(words[0].toLowerCase());
  });

  return [...platform].map((item) => {
    switch (item) {
      case 'pc':
        return <Windows key={item} />;
      case 'playstation':
        return <PlayStation key={item} />;
      case 'xbox':
        return <Xbox key={item} />;
      case 'android':
        return <Android key={item} />;
      case 'ios':
        return <IOS key={item} />;
      case 'linux':
        return <Linux key={item} />;
      case 'nintendo':
        return <Nintendo key={item} />;
      case 'web':
        return <Web key={item} />;
      default:
        return undefined;
    }
  });
};

export const generateStars = (rating) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (Math.round(rating) >= i) {
      stars.push(<Star key={i} />);
    } else {
      stars.push(<StarEmpty key={i} />);
    }
  }

  return stars;
};
