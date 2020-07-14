import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import {Text} from 'react-native-elements';
import {CurrentWeather} from './components/CurrentWeather';
import {WeatherData} from './core/types';
import {HourlyWeather} from './components/HourlyWeather';
import {DailyWeather} from './components/DailyWeather';
import useWeather from './hooks/useWeather';
import {WeatherAlerts} from './components/WeatherAlerts';

const App = () => {
  const {weather, weatherAlerts, error, loading, refresh} = useWeather();

  /**
   * Effect to refresh weather data on component mount.
   */
  React.useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderWeatherData = (data: WeatherData) => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[ACTIVITY_INDICATOR_COLOR]}
            refreshing={loading}
            onRefresh={refresh}
          />
        }>
        {data ? (
          <>
            <CurrentWeather data={data.current} />
            {weatherAlerts?.alerts?.length ? (
              <WeatherAlerts data={weatherAlerts} />
            ) : null}
            <HourlyWeather data={data.hourly} />
            <DailyWeather data={data.daily} hourlyData={data.hourly} />
          </>
        ) : (
          <Text style={styles.detailText}>No data available.</Text>
        )}
      </ScrollView>
    );
  };

  const renderDetails = () => {
    return (
      <View style={styles.detailContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={ACTIVITY_INDICATOR_COLOR} />
        ) : error ? (
          <Text style={styles.detailText}>{error}</Text>
        ) : (
          <Text style={styles.detailText}>No data available.</Text>
        )}
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {weather ? renderWeatherData(weather) : renderDetails()}
      </SafeAreaView>
    </>
  );
};

export default App;

const ACTIVITY_INDICATOR_COLOR = '#5fa0ea';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailContainer: {
    alignItems: 'center',
    padding: 16,
  },
  detailText: {
    textAlign: 'center',
  },
});
