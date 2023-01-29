import React from 'react';
import {WeatherData} from '../core/types';
import {getLocation, CurrentLocationData} from '../core/location';
import {fetchWeatherData} from '../core/api';

enum Actions {
  LOAD = 'LOAD',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

interface WeatherDataState {
  isLoading: boolean;
  location: CurrentLocationData | null;
  weather: WeatherData | null;
  error: any | null;
}

const initialState: WeatherDataState = {
  isLoading: false,
  location: null,
  weather: null,
  error: null,
};

const weatherReducer: React.Reducer<WeatherDataState, any> = (
  state,
  action,
): WeatherDataState => {
  switch (action.type) {
    case Actions.LOAD:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case Actions.SUCCESS:
      return {
        ...state,
        isLoading: false,
        location: action.payload.location,
        weather: action.payload.weather,
        error: null,
      };
    case Actions.FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error();
  }
};

/**
 * Wrapper hook that gets the current locationa and fetches the corresponding
 * weather api. Exposes the location and weather data, as well as a function
 * to refresh the data.
 */
const useWeather = () => {
  const [state, dispatch] = React.useReducer(weatherReducer, initialState);

  React.useEffect(() => {
    if (!state.isLoading) {
      return;
    }

    const getData = async () => {
      try {
        const location = await getLocation();
        console.info(`Location: ${JSON.stringify(location)}`);

        const data = await fetchWeatherData(location.lat, location.lon);
        dispatch({
          type: Actions.SUCCESS,
          payload: {
            location: location,
            weather: data,
            weatherAlerts: data.alerts,
          },
        });
      } catch (error) {
        console.log(error);
        dispatch({type: Actions.FAIL, payload: error.message});
      }
    };

    getData();
    // TODO: handle cancelation
  }, [state.isLoading]);

  const refresh = () => dispatch({type: Actions.LOAD});

  return {
    location: state.location,
    weather: state.weather,
    error: state.error,
    loading: state.isLoading,
    refresh,
  };
};

export default useWeather;
