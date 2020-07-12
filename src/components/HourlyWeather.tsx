import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {HourlyWeatherData} from '../types';
import getWeatherDescription from '../helpers/getWeatherDescription';
import getWeatherColor from '../helpers/getWeatherColor';
import {HourlyWeatherLine} from './HourlyWeatherLine';

enum DataChoice {
  TEMPERATURE,
  WIND_SPEED,
  CLOUDS,
  HUMIDITY,
}

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

  const getValue = (data: HourlyWeatherData) => {
    let value: number;
    switch (dataChoice) {
      case DataChoice.TEMPERATURE:
        value = data.temp;
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
    }

    return Math.round(value);
  };

  const getUnits = () => {
    switch (dataChoice) {
      case DataChoice.TEMPERATURE:
        return '°';
      case DataChoice.WIND_SPEED:
        return ' mph';
      case DataChoice.CLOUDS:
      case DataChoice.HUMIDITY:
        return ' %';
    }
  };
  const values = dataToDisplay.map((data) => Math.round(getValue(data)));
  const min = Math.min(...values);
  const max = Math.max(...values);

  /**
   * Get the relative percentage of the value compared to the entire data set.
   */
  const getValueRelativePercent = (value: number): number =>
    (value - min) / (max - min);

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

          const value = getValue(data);
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
              unit={getUnits()}
              onPress={() => setShowFull((val) => !val)}
            />
          );
        },
      )}
      <ButtonGroup
        buttons={['Temp', 'Wind', 'Clouds', 'Humidity']}
        buttonStyle={styles.buttonGroupButton}
        textStyle={styles.buttonGroupText}
        containerStyle={styles.buttonGroupContainer}
        buttonContainerStyle={styles.buttonGroupContainer}
        selectedIndex={dataChoice}
        onPress={(index) => setDataChoice(index)}
      />
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
    borderRadius: 10,
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
});
