import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import useCurrentLocation from './hooks/useCurrentLocation';
import useWeatherApi from './hooks/useWeatherApi';
import {CurrentWeather} from './components/CurrentWeather';
import {WeatherData} from './types';
import {HourlyWeather} from './components/HourlyWeather';

const App = () => {
  const {currentLocationState, getLocation} = useCurrentLocation();
  const {weatherApiState, getWeather} = useWeatherApi();

  const [refreshing, setRefreshing] = React.useState(false);

  /**
   * Effect to fetch current location on component mount.
   */
  React.useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Effect to fetch weather data for current location when location changes.
   */
  React.useEffect(() => {
    if (!currentLocationState.data) {
      return;
    }

    console.log(`Location: ${JSON.stringify(currentLocationState.data)}`);
    getWeather(currentLocationState.data.lat, currentLocationState.data.lon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocationState.data]);

  /**
   * Update current location and fetch coresponding weather data.
   */
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getLocation();
  }, [getLocation]);

  /**
   * Effect to disable refreshing flag once location and weather is done loading.
   */
  React.useEffect(() => {
    if (currentLocationState.isLoading || weatherApiState.isLoading) {
      return;
    }

    setRefreshing(false);
  }, [currentLocationState.isLoading, weatherApiState.isLoading]);

  const renderWeatherData = (data: WeatherData) => {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {weatherApiState.data ? (
          <>
            <CurrentWeather data={data.current} />
            <HourlyWeather data={data.hourly} />
          </>
        ) : null}
      </ScrollView>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {renderWeatherData(weatherApiState.data)}
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
