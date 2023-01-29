import Config from 'react-native-config';
import {WeatherData, HereReverseGeocode} from './types';
import oneCallResponse from '../mockData/oneCallResponse.json';
import {USE_MOCK_WEATHER_DATA} from './constants';

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

const fetchData = async (lat: number, lon: number): Promise<WeatherData> => {
  // return dummy data for testing, since API requests are limited to 1000 per day
  if (USE_MOCK_WEATHER_DATA) {
    return oneCallResponse as WeatherData;
  }

  const response = await fetch(buildRequestUrl(lat, lon));
  return response.ok ? response.json() : null;
};

const fetchWeatherData = async (
  lat: number,
  lon: number,
): Promise<WeatherData> => {
  return fetchData(lat, lon).then((weatherData) => {
    if (weatherData) {
      return Promise.resolve(weatherData);
    } else {
      return Promise.reject('Failed to fetch weather data.');
    }
  });
};

/**
 * Builds the request url for the HERE reverse geocode call
 * See: https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics/endpoint-reverse-geocode-brief.html
 */
const buildHereRequestUrl = (lat: number, lon: number): string => {
  const URL = 'https://revgeocode.search.hereapi.com/v1/revgeocode';
  const at = `${lat}%2C${lon}`;
  const lang = 'en-US';
  const apiKey = Config.HERE_API_KEY;
  return `${URL}?at=${at}&lang=${lang}&apiKey=${apiKey}`;
};

const fetchGeoCode = async (
  lat: number,
  lon: number,
): Promise<HereReverseGeocode | null> => {
  try {
    const response = await fetch(buildHereRequestUrl(lat, lon));
    return response.ok ? response.json() : null;
  } catch (error) {
    return null;
  }
};

export {fetchWeatherData, fetchGeoCode};
