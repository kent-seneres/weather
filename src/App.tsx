import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  View,
  Linking,
} from 'react-native';
import {Text} from 'react-native-elements';
import {CurrentWeather} from './components/CurrentWeather';
import {WeatherData} from './core/types';
import {HourlyWeather} from './components/HourlyWeather';
import {DailyWeather} from './components/DailyWeather';
import useWeather from './hooks/useWeather';
import {WeatherAlerts} from './components/WeatherAlerts';
import {fetchGeoCode} from './core/api';

const App = () => {
  const {weather, error, loading, refresh} = useWeather();
  const [locationString, setLocationString] = React.useState<string>();

  /**
   * Effect to refresh weather data on component mount.
   */
  React.useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Effect to fetch the address of the current coordinates using reverse geocoding
   */
  React.useEffect(() => {
    if (!weather?.lat || !weather?.lon) {
      return;
    }

    let isCancelled = false;
    const fetch = async () => {
      const reverseGeocodeResponse = await fetchGeoCode(
        weather.lat,
        weather.lon,
      );

      if (reverseGeocodeResponse && !isCancelled) {
        if (reverseGeocodeResponse.items.length > 0) {
          // just use first result
          const result = reverseGeocodeResponse.items[0];

          // build very simplified place string from address details
          const place = `${result.address.city}, ${result.address.state}`;
          setLocationString(place);
        }
      }
    };

    fetch();

    return () => {
      isCancelled = true;
    };
  }, [weather?.lat, weather?.lon]);

  /**
   * Open weather.com in browser for convenient alternate weather data source
   */
  const openWeather = async (lat: number, lon: number) => {
    const url = `https://weather.com/weather/today/l/${lat},${lon}`;

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

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
            <CurrentWeather
              data={data.current}
              locationString={locationString}
              onLongPress={() => openWeather(data.lat, data.lon)}
            />
            {data.alerts?.length ? <WeatherAlerts data={data.alerts} /> : null}
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
      <SafeAreaView testID="mainScreen" style={styles.container}>
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
