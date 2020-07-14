import {Weather} from '../core/types';

/**
 * Get weather condition description from the code.
 * See: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
 */
const getWeatherDescription = (data: Weather | null): string => {
  const group = data?.id ? Math.round(data.id / 100) : null;
  switch (group) {
    case 2:
      return 'Thunderstorm';
    case 3:
      return 'Drizzle';
    case 5: {
      switch (data.id) {
        case 500:
          return 'Light Rain';
        case 501:
          return 'Moderate Rain';
        case 502:
        case 503:
        case 504:
          return 'Heavy Rain';
        case 511:
          return 'Freezing Rain';
        default:
          return 'Rain Shower';
      }
    }
    case 6: {
      switch (data.id) {
        case 600:
          return 'Light Snow';
        case 601:
          return 'Snow';
        case 602:
          return 'Heavy Snow';
        case 611:
        case 612:
        case 613:
          return 'Sleet';
        case 615:
        case 616:
          return 'Rain & Snow';
        case 620:
          return 'Light Snow Shower';
        case 621:
          return 'Snow Shower';
        case 622:
          return 'Heavy Snow Shower';
        default:
          return 'Snow';
      }
    }
    case 7: {
      switch (data.id) {
        case 701:
          return 'Mist';
        case 711:
          return 'Smoke';
        case 721:
          return 'Haze';
        case 731:
          return 'Dust Whirls';
        case 741:
          return 'Fog';
        case 751:
          return 'Sand';
        case 761:
          return 'Dust';
        case 762:
          return 'Volcanic Ash';
        case 771:
          return 'Squalls';
        case 781:
          return 'Tornado';
        default:
          return null;
      }
    }
    case 8: {
      switch (data.id) {
        case 800:
        case 801:
          return 'Clear';
        case 802:
          return 'Partly Cloudy';
        case 803:
          return 'Mostly Cloudy';
        case 804:
          return 'Overcast';
        default:
          return 'Cloudy';
      }
    }
    default:
      return null;
  }
};

export default getWeatherDescription;
