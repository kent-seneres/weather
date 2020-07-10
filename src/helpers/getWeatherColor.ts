import {Weather} from '../types';

/**
 * Get a color value corresponding to the weather condition.
 */
const getWeatherColor = (data: Weather | null): string => {
  const group = data?.id ? Math.round(data.id / 100) : null;
  switch (group) {
    case 2:
      return '#424e5b';
    case 3:
      return '#b6d5f9';
    case 5: {
      switch (data.id) {
        case 500:
          return '#b6d5f9';
        case 501:
          return '#5fa0ea';
        case 502:
        case 503:
        case 504:
          return '#2a4caa';
        case 511:
          return '#2a4caa';
        default:
          return '#2a4caa';
      }
    }
    case 6: {
      switch (data.id) {
        case 600:
          return '#a0ceeb';
        case 601:
          return '#5c9ed7';
        case 602:
          return '#487eb8';
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
          return '#81bae2';
        case 620:
          return '#a0ceeb';
        case 621:
          return '#5c9ed7';
        case 622:
          return '#487eb8';
        default:
          return '#a0ceeb';
      }
    }
    case 7: {
      return '#24272a';
    }
    case 8: {
      switch (data.id) {
        case 800:
        case 801:
          return '#cccfd2';
        case 802:
          return '#86898c';
        case 803:
          return '#5f6265';
        case 804:
          return '#4c4f52';
        default:
          return '#4c4f52';
      }
    }
    default:
      return '#24272a';
  }
};

export default getWeatherColor;
