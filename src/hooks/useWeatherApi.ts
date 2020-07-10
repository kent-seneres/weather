import Config from 'react-native-config';
import React from 'react';
import {WeatherData} from '../types';
import dummyData from '../dummyData.json';

enum Actions {
  SET_COORDINATES = 'SET_COORDINATES',
  LOAD = 'LOAD',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

interface WeatherApiState {
  isLoading: boolean;
  isError: boolean;
  requestCoordinates: Coordinates | null;
  data: WeatherData | null;
}

interface Coordinates {
  lat: number;
  lon: number;
}

const initialState: WeatherApiState = {
  isLoading: false,
  isError: false,
  requestCoordinates: null,
  data: null,
};

const weatherApiReducer: React.Reducer<WeatherApiState, any> = (
  state,
  action,
) => {
  switch (action.type) {
    case Actions.SET_COORDINATES:
      return {
        ...state,
        requestCoordinates: action.payload,
      };
    case Actions.LOAD:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case Actions.SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case Actions.FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

/**
 * Builds the request url for the OpenWeather One Call API
 * See: https://openweathermap.org/api/one-call-api
 */
const buildRequestUrl = (lat: number, lon: number) => {
  const URL = 'https://api.openweathermap.org/data/2.5/onecall';
  const units = 'imperial';
  return `${URL}?lat=${lat}&lon=${lon}&units=${units}&appid=${Config.OWM_APP_ID}`;
};

const useWeatherApi = () => {
  const [state, dispatch] = React.useReducer(weatherApiReducer, initialState);

  React.useEffect(() => {
    if (!state.requestCoordinates) {
      return;
    }

    dispatch({type: Actions.LOAD});

    const fetchData = async () => {
      // return dummy data for testing, since API requests are limited to 1000 per day
      return dummyData;

      const response = await fetch(
        buildRequestUrl(
          state.requestCoordinates.lat,
          state.requestCoordinates.lon,
        ),
      );
      return response.json();
    };

    fetchData()
      .then((data) => {
        dispatch({type: Actions.SUCCESS, payload: data});
      })
      .catch((error) => {
        dispatch({type: Actions.FAIL, payload: error});
      });
  }, [state.requestCoordinates]);

  /**
   * Set the coordinates for the weather request and fetch data.
   */
  const getWeather = (lat: number, lon: number) =>
    dispatch({
      type: Actions.SET_COORDINATES,
      payload: {
        lat: lat,
        lon: lon,
      },
    });

  return {
    weatherApiState: state,
    getWeather,
  };
};

export default useWeatherApi;
