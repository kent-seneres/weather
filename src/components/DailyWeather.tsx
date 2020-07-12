import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {DailyWeatherData, HourlyWeatherData} from '../types';
import {DailyWeatherLine} from './DailyWeatherLine';
import {HourlyWeather} from './HourlyWeather';
import getTimeString from '../helpers/getTimeString';

export interface DailyWeatherProps {
  data: DailyWeatherData[];
  hourlyData?: HourlyWeatherData[];
}

/**
 * Component that shows daily weather data in a graph like form.
 */
export const DailyWeather: React.FC<DailyWeatherProps> = ({
  data,
  hourlyData,
}) => {
  const [showDetailIds, setShowDetailIds] = React.useState<number[]>([]);

  const minTemperatures = data.map((dailyData) =>
    Math.round(dailyData.temp.min),
  );
  const maxTemperatures = data.map((dailyData) =>
    Math.round(dailyData.temp.max),
  );
  const min = Math.min(...minTemperatures);
  const max = Math.max(...maxTemperatures);

  const getRelativeOffsetPercent = (value: number): number =>
    (value - min) / (max - min);

  const getRelativeWidthPercent = (
    minValue: number,
    maxValue: number,
  ): number => (maxValue - minValue) / (max - min);

  const toggleShowDetail = (id: number) => {
    if (showDetailIds.includes(id)) {
      setShowDetailIds(showDetailIds.filter((val) => id !== val));
    } else {
      setShowDetailIds([...showDetailIds, id]);
    }
  };

  const renderDayDetails = (dailyData: DailyWeatherData) => {
    // find hourly data that corresponds to the same date of the given timestamp
    const date = new Date(dailyData.dt * 1000).getDate();
    const availableHourlyData = hourlyData.filter((value) => {
      const hourlyDataDate = new Date(value.dt * 1000).getDate();
      return date === hourlyDataDate;
    });

    return (
      <>
        {availableHourlyData.length === 0 ? (
          <Text style={styles.detailText}>No hourly data available.</Text>
        ) : (
          <HourlyWeather data={availableHourlyData} />
        )}
        <Text style={styles.detailText}>
          Sunrise {getTimeString(dailyData.sunrise)}
          {'; '}
          Sunset {getTimeString(dailyData.sunset)}
        </Text>
      </>
    );
  };

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
          <>
            <DailyWeatherLine
              key={dailyData.dt}
              timestamp={dailyData.dt}
              iconId={weatherDetail?.icon}
              minValue={`${minValue}°`}
              maxValue={`${maxValue}°`}
              widthPercent={width}
              offsetPercent={offset}
              onPress={() => toggleShowDetail(dailyData.dt)}
            />
            {showDetailIds.includes(dailyData.dt)
              ? renderDayDetails(dailyData)
              : null}
          </>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  detailText: {
    textAlign: 'center',
    marginBottom: 8,
  },
});
