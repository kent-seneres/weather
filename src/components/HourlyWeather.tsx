import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, ButtonGroup} from 'react-native-elements';
import {HourlyWeatherData} from '../core/types';
import getWeatherDescription from '../helpers/getWeatherDescription';
import getWeatherColor from '../helpers/getWeatherColor';
import {HourlyWeatherLine} from './HourlyWeatherLine';

enum DataChoice {
  TEMPERATURE,
  FEELS_LIKE,
  PRECIPITATION_PROBABILITY,
  WIND_SPEED,
  CLOUDS,
  HUMIDITY,
  UVI,
}

const getValue = (dataChoice: DataChoice, data: HourlyWeatherData) => {
  let value: number;
  switch (dataChoice) {
    case DataChoice.TEMPERATURE:
      value = data.temp;
      break;
    case DataChoice.FEELS_LIKE:
      value = data.feels_like;
      break;
    case DataChoice.WIND_SPEED:
      value = data.wind_speed;
      break;
    case DataChoice.CLOUDS:
      value = data.clouds;
      break;
    case DataChoice.HUMIDITY:
      value = data.humidity;
      break;
    case DataChoice.PRECIPITATION_PROBABILITY:
      value = data.pop * 100;
      break;
    case DataChoice.UVI:
      value = data.uvi;
      break;
  }

  return Math.round(value);
};

const getUnits = (dataChoice: DataChoice) => {
  switch (dataChoice) {
    case DataChoice.TEMPERATURE:
    case DataChoice.FEELS_LIKE:
      return '°';
    case DataChoice.WIND_SPEED:
      return ' mph';
    case DataChoice.CLOUDS:
    case DataChoice.HUMIDITY:
    case DataChoice.PRECIPITATION_PROBABILITY:
      return ' %';
    default:
      return '';
  }
};

export interface HourlyWeatherProps {
  data: HourlyWeatherData[];
}

/**
 * Component that shows hourly weather data in a graph like form.
 */
export const HourlyWeather: React.FC<HourlyWeatherProps> = ({
  data: hourlyData,
}) => {
  const [showFull, setShowFull] = React.useState<boolean>(false);

  const dataToDisplay = hourlyData.filter(
    (_: HourlyWeatherData, index: number) =>
      showFull || (index < 24 && index % 2 === 0),
  );

  const [dataChoice, setDataChoice] = React.useState<DataChoice>(
    DataChoice.TEMPERATURE,
  );

  const values = dataToDisplay.map((data) =>
    Math.round(getValue(dataChoice, data)),
  );
  const min = Math.min(...values);
  const max = Math.max(...values);

  /**
   * Get the relative percentage of the value compared to the entire data set.
   */
  const getValueRelativePercent = (value: number): number => {
    if (max === min) {
      return 1;
    }

    return (value - min) / (max - min);
  };

  return (
    <View style={styles.container}>
      {dataToDisplay.map(
        (
          data: HourlyWeatherData,
          index: number,
          array: HourlyWeatherData[],
        ) => {
          // TODO: deal with multiple weather values in the array
          const weatherDetail = data.weather[0];
          const currentDescription = getWeatherDescription(weatherDetail);
          const previousDescription = getWeatherDescription(
            array[index - 1]?.weather[0],
          );

          const description =
            currentDescription === previousDescription
              ? null
              : currentDescription;

          const value = getValue(dataChoice, data);
          return (
            <HourlyWeatherLine
              key={data.dt}
              timestamp={data.dt}
              color={getWeatherColor(weatherDetail?.id)}
              description={description}
              roundedTop={index === 0}
              roundedBottom={index === array.length - 1}
              offsetPercent={getValueRelativePercent(value)}
              value={value}
              unit={getUnits(dataChoice)}
              onPress={() => setShowFull((val) => !val)}
            />
          );
        },
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.buttonGroup}>
        <ButtonGroup
          buttons={[
            `Temp (F${getUnits(DataChoice.TEMPERATURE)})`,
            `Feels-Like (F${getUnits(DataChoice.FEELS_LIKE)})`,
            `Precip Prob (${getUnits(
              DataChoice.PRECIPITATION_PROBABILITY,
            ).trim()})`,
            `Wind (${getUnits(DataChoice.WIND_SPEED).trim()})`,
            `Clouds (${getUnits(DataChoice.CLOUDS).trim()})`,
            `Humidity (${getUnits(DataChoice.HUMIDITY).trim()})`,
            `UV Index`,
          ]}
          buttonStyle={styles.buttonGroupButton}
          textStyle={styles.buttonGroupText}
          containerStyle={styles.buttonGroupContainer}
          buttonContainerStyle={styles.buttonGroupContainer}
          selectedIndex={dataChoice}
          onPress={(index) => setDataChoice(index)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  buttonGroupButton: {
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: '#f3f0f6',
  },
  buttonGroupText: {
    fontSize: 14,
  },
  buttonGroupContainer: {
    padding: 2,
    borderRadius: 10,
    backgroundColor: null,
    borderEndWidth: 0,
    borderWidth: 0,
  },
  buttonGroup: {
    padding: 4,
  },
});
