import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-elements';
import {CurrentWeatherData} from '../core/types';
import getTimeString from '../helpers/getTimeString';
import getIcon from '../helpers/getIcon';

export interface CurrentWeatherProps {
  data: CurrentWeatherData;
}

const SHOW_TIMESTAMP_DURATION_MS = 3000;

/**
 * Component that shows the current weather data.
 */
export const CurrentWeather: React.FC<CurrentWeatherProps> = ({data}) => {
  const [showTimestamp, setShowTimestamp] = React.useState<boolean>(true);

  /**
   * Effect to show the timestamp and automatically dismiss it after a few seconds.
   */
  React.useEffect(() => {
    setShowTimestamp(true);

    const timeoutId = setTimeout(() => {
      setShowTimestamp(false);
    }, SHOW_TIMESTAMP_DURATION_MS);

    // clear the timeout if timestamp changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [data.dt]);

  return (
    <View style={styles.container}>
      {showTimestamp ? (
        <Text style={styles.timestamp}>
          Updated: {new Date(data.dt * 1000).toLocaleString()}
        </Text>
      ) : null}
      <View style={styles.currentContainer}>
        <Image style={styles.icon} source={getIcon(data.weather[0].icon)} />
        <View style={styles.temperatureContainer}>
          <Text h2>{Math.round(data.temp)}°</Text>
          <Text>Feels {Math.round(data.feels_like)}°</Text>
        </View>
      </View>
      <Text style={styles.detailText}>
        Sunrise {getTimeString(data.sunrise)}
        {'; '}
        Sunset {getTimeString(data.sunset)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperatureContainer: {
    padding: 4,
  },
  currentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    height: '75%',
    marginEnd: 8,
  },
  timestamp: {
    marginTop: 12,
    fontStyle: 'italic',
  },
  detailText: {
    textAlign: 'center',
    marginBottom: 12,
  },
});
