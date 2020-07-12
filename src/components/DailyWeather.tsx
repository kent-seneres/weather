import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-elements';
import {DailyWeatherData, DailyTemperature} from '../types';
import getIcon from '../helpers/getIcon';
import getDayString from '../helpers/getDayString';

export interface DailyWeatherProps {
  data: DailyWeatherData[];
}

export const DailyWeather: React.FC<DailyWeatherProps> = ({data}) => {
  const minTemperatures = data.map((dailyData) => dailyData.temp.min);
  const maxTemperatures = data.map((dailyData) => dailyData.temp.max);
  const min = Math.min(...minTemperatures);
  const max = Math.max(...maxTemperatures);

  const getTemperatureWidthOffset = (temperature: DailyTemperature): string => {
    // TODO: magic numbers
    const minWidth = 0;
    const maxWidth = 0.75;

    const normalizedTemperature =
      (Math.round(temperature.min) - min) / (max - min);
    const width = minWidth + normalizedTemperature * (maxWidth - minWidth);

    return `${width * 100}%`;
  };

  const getTemperatureWidth = (temperature: DailyTemperature): string => {
    const maxWidth = 0.7;
    const range = Math.round(temperature.max) - Math.round(temperature.min);

    const normalized = range / (max - min);
    const width = normalized * maxWidth;

    return `${width * 100}%`;
  };

  return (
    <View style={styles.container}>
      {data.map((dailyData: DailyWeatherData) => {
        const offset = getTemperatureWidthOffset(dailyData.temp);
        const width = getTemperatureWidth(dailyData.temp);
        return (
          <View key={dailyData.dt} style={styles.dayLine}>
            <Text style={styles.time}>
              {getDayString(dailyData.dt).toUpperCase()}
            </Text>
            <Image
              style={styles.icon}
              source={getIcon(dailyData.weather[0].icon)}
            />
            <View style={styles.valueLine}>
              <View
                style={{
                  width: offset,
                }}
              />
              <Text style={styles.value}>
                {Math.round(dailyData.temp.min)}°
              </Text>
              <View
                style={{
                  ...styles.line,
                  width: width,
                }}
              />
              <Text style={styles.value}>
                {Math.round(dailyData.temp.max)}°
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  dayLine: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'center',
  },
  time: {
    width: '13%',
  },
  icon: {
    width: '10%',
  },
  valueLine: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    paddingStart: 12,
    paddingEnd: 8,
  },
  line: {
    width: 50,
    height: 28,
    backgroundColor: '#f3f0f6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9d7dc',
  },
  value: {
    padding: 4,
  },
});
