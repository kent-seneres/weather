import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {HourlyWeatherData} from '../types';
import getWeatherDescription from '../helpers/getWeatherDescription';
import getTimeString from '../helpers/getTimeString';

export interface HourlyWeatherProps {
  data: HourlyWeatherData[];
}

/**
 * Component that shows hourly weather data in a graph like form.
 */
export const HourlyWeather: React.FC<HourlyWeatherProps> = ({data}) => {
  const dataToDisplay = data.filter(
    (_: HourlyWeatherData, index: number) => index < 24 && index % 2 === 0,
  );

  const temperatures = dataToDisplay.map((value) => value.temp);
  const min = Math.min(...temperatures);
  const max = Math.max(...temperatures);

  /**
   * Get the width percentage for the value relative to the entire data set.
   */
  const getTemperatureWidthOffset = (temperature: number): string => {
    // TODO: magic numbers
    const minWidth = 0.3;
    const maxWidth = 0.82;

    const normalizedTemperature = (Math.round(temperature) - min) / (max - min);
    const width = minWidth + normalizedTemperature * (maxWidth - minWidth);

    return `${width * 100}%`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hourly</Text>
      {dataToDisplay.map(
        (
          value: HourlyWeatherData,
          index: number,
          array: HourlyWeatherData[],
        ) => {
          const currentDescription = getWeatherDescription(value.weather[0]);
          const previousDescription = getWeatherDescription(
            array[index - 1]?.weather[0],
          );

          const description =
            currentDescription === previousDescription
              ? null
              : currentDescription;

          return (
            <View style={styles.hourLine}>
              <Text style={styles.time}>{getTimeString(value.dt, false)}</Text>
              <View style={styles.valueLine}>
                <View
                  style={{
                    ...styles.descriptionContainer,
                    width: getTemperatureWidthOffset(value.temp),
                  }}>
                  {description ? (
                    <Text style={styles.description}>{description}</Text>
                  ) : null}

                  <View style={styles.line} />
                </View>
                <Text style={styles.value}>{Math.round(value.temp)}°</Text>
              </View>
            </View>
          );
        },
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  hourLine: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'center',
    padding: 2,
  },
  time: {
    width: '14%',
    textAlign: 'right',
  },
  valueLine: {
    flexDirection: 'row',
    flexGrow: 1,
    padding: 4,
    alignItems: 'center',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 8,
    paddingEnd: 8,
  },
  description: {
    fontStyle: 'italic',
    fontSize: 12,
    marginEnd: 8,
  },
  line: {
    backgroundColor: '#d9d7dc',
    height: 2,
    flexGrow: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d9d7dc',
  },
  value: {
    paddingStart: 8,
    padding: 4,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#f3f0f6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#b5b3b8',
  },
  header: {
    alignSelf: 'center',
  },
});
