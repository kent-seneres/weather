import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {CurrentWeatherData} from '../types';
import getTimeString from '../helpers/getTimeString';

export interface CurrentWeatherProps {
  data: CurrentWeatherData;
}

/**
 * Component that shows the current weather data.
 */
export const CurrentWeather: React.FC<CurrentWeatherProps> = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.temperatureContainer}>
        <Text h2>{Math.round(data.temp)}°</Text>
        <Text>Feels {Math.round(data.feels_like)}°</Text>
        <Text>Sunrise: {getTimeString(data.sunrise)}</Text>
        <Text>Sunset: {getTimeString(data.sunset)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperatureContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
