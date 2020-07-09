import React from 'react';
import {SafeAreaView, ScrollView, Text, StatusBar} from 'react-native';
import useCurrentLocation from './hooks/useCurrentLocation';
import useWeatherApi from './hooks/useWeatherApi';

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
    console.log(weatherApiState.data.current);
  }, [weatherApiState.data]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text style={{textAlign: 'center'}}>Weather</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
