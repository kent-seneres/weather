import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-elements';
import {CurrentWeatherData} from '../types';
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
  const [timer, setTimer] = React.useState<NodeJS.Timer>(null);
  const [showTimestamp, setShowTimestamp] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    setShowTimestamp(true);
    const timeoutId = setTimeout(() => {
      setShowTimestamp(false);
    }, SHOW_TIMESTAMP_DURATION_MS);
    setTimer(timeoutId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.dt]);

  const icon = getIcon(data.weather[0].icon);
  return (
    <View style={styles.container}>
      {showTimestamp ? (
        <Text>Updated: {new Date(data.dt * 1000).toLocaleString()}</Text>
      ) : null}
      <View style={styles.currentContainer}>
        <Image style={styles.icon} source={icon} />
        <View style={styles.temperatureContainer}>
          <Text h2>{Math.round(data.temp)}°</Text>
          <Text>Feels {Math.round(data.feels_like)}°</Text>
        </View>
      </View>

      <Text>Sunrise: {getTimeString(data.sunrise)}</Text>
      <Text>Sunset: {getTimeString(data.sunset)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
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
    marginBottom: 4,
  },
  icon: {
    height: '75%',
    marginEnd: 8,
  },
});
