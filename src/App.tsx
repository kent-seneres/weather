import React from 'react';
import {SafeAreaView, ScrollView, ActivityIndicator, View} from 'react-native';
import useCurrentLocation from './hooks/useCurrentLocation';
import useWeatherApi from './hooks/useWeatherApi';
import {CurrentWeather} from './components/CurrentWeather';
import {WeatherData} from './types';
import {HourlyWeather} from './components/HourlyWeather';

const App = () => {
  const {currentLocationState: currentPositionState} = useCurrentLocation();
  const {weatherApiState, getWeather} = useWeatherApi();

  React.useEffect(() => {
    if (!currentPositionState.data) {
      return;
    }

    console.log(currentPositionState.data);
    getWeather(currentPositionState.data.lat, currentPositionState.data.lon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPositionState.data]);

  React.useEffect(() => {
    if (!weatherApiState.data) {
      return;
    }

    console.log(weatherApiState.data.current);
  }, [weatherApiState.data]);

  const renderWeatherData = (data: WeatherData) => {
    return (
      <ScrollView>
        <CurrentWeather data={data.current} />
        <HourlyWeather data={data.hourly} />
      </ScrollView>
    );
  };

  return (
    <>
      <SafeAreaView>
        {weatherApiState.data ? (
          renderWeatherData(weatherApiState.data)
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default App;
