import Config from 'react-native-config';
import {WeatherData, AlertsData} from './types';
import oneCallResponse from '../mockData/oneCallResponse.json';
import alertsResponse from '../mockData/alertsResponse.json';

const USE_DUMMY_DATA = __DEV__ && true;

interface WeatherApiData {
  weather: WeatherData;
  alerts: AlertsData | null;
}

/**
 * Builds the request url for the OpenWeather One Call API
 * See: https://openweathermap.org/api/one-call-api
 */
const buildRequestUrl = (lat: number, lon: number): string => {
  const URL = 'https://api.openweathermap.org/data/2.5/onecall';
  const units = 'imperial';
  const exclude = 'minutely';
  return `${URL}?lat=${lat}&lon=${lon}&units=${units}&exclude=${exclude}&appid=${Config.OWM_APP_ID}`;
};

/**
 * Builds the request url for the weatherbit.io Alerts API
 * See: https://www.weatherbit.io/api/swaggerui/weather-api-v2#!/Alerts/
 */
const buildAlertsRequestUrl = (lat: number, lon: number): string => {
  const URL = 'https://api.weatherbit.io/v2.0/alerts';
  return `${URL}?lat=${lat}&lon=${lon}&key=${Config.WEATHERBIT_API_KEY}`;
};

const fetchData = async (lat: number, lon: number): Promise<WeatherData> => {
  // return dummy data for testing, since API requests are limited to 1000 per day
  if (USE_DUMMY_DATA) {
    return oneCallResponse as WeatherData;
  }

  const response = await fetch(buildRequestUrl(lat, lon));
  return response.ok ? response.json() : null;
};

const fetchAlerts = async (lat: number, lon: number): Promise<AlertsData> => {
  if (USE_DUMMY_DATA) {
    return alertsResponse as AlertsData;
  }

  try {
    const response = await fetch(buildAlertsRequestUrl(lat, lon));
    return response.ok ? response.json() : null;
  } catch (error) {
    // silently catch errors from alerts api
    console.error(error.message);
    return null;
  }
};

const fetchWeatherData = async (
  lat: number,
  lon: number,
): Promise<WeatherApiData> => {
  return Promise.all([fetchData(lat, lon), fetchAlerts(lat, lon)]).then(
    ([weatherData, alertsData]) => {
      if (weatherData) {
        const data = {weather: weatherData, alerts: alertsData};
        return Promise.resolve(data);
      } else {
        return Promise.reject('Failed to fetch weather data.');
      }
    },
  );
};

export default fetchWeatherData;
