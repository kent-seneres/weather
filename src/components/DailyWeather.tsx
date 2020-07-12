import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DailyWeatherData} from '../types';
import {DailyWeatherLine} from './DailyWeatherLine';

export interface DailyWeatherProps {
  data: DailyWeatherData[];
}

/**
 * Component that shows daily weather data in a graph like form.
 */
export const DailyWeather: React.FC<DailyWeatherProps> = ({data}) => {
  const minTemperatures = data.map((dailyData) =>
    Math.round(dailyData.temp.min),
  );
  const maxTemperatures = data.map((dailyData) =>
    Math.round(dailyData.temp.max),
  );
  const min = Math.min(...minTemperatures);
  const max = Math.max(...maxTemperatures);

  const getRelativeOffsetPercent = (value: number) =>
    (value - min) / (max - min);

  const getRelativeWidthPercent = (
    minValue: number,
    maxValue: number,
  ): number => (maxValue - minValue) / (max - min);

  return (
    <View style={styles.container}>
      {data.map((dailyData: DailyWeatherData) => {
        // TODO: deal with multiple weather values in the array
        const weatherDetail = dailyData.weather[0];

        const minValue = Math.round(dailyData.temp.min);
        const maxValue = Math.round(dailyData.temp.max);
        const offset = getRelativeOffsetPercent(minValue);
        const width = getRelativeWidthPercent(minValue, maxValue);

        return (
          <DailyWeatherLine
            key={dailyData.dt}
            timestamp={dailyData.dt}
            iconId={weatherDetail?.icon}
            minValue={`${minValue}°`}
            maxValue={`${maxValue}°`}
            widthPercent={width}
            offsetPercent={offset}
          />
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
});
