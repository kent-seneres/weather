import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Text, ButtonGroup} from 'react-native-elements';
import {HourlyWeatherData} from '../types';
import getWeatherDescription from '../helpers/getWeatherDescription';
import getTimeString from '../helpers/getTimeString';
import getWeatherColor from '../helpers/getWeatherColor';

enum DataChoice {
  TEMPERATURE,
  FEELS_LIKE,
  WIND_SPEED,
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
    switch (dataChoice) {
      case DataChoice.TEMPERATURE:
        return data.temp;
      case DataChoice.FEELS_LIKE:
        return data.feels_like;
      case DataChoice.WIND_SPEED:
        return data.wind_speed;
    }
  };
  const getUnits = () => {
    switch (dataChoice) {
      case DataChoice.TEMPERATURE:
      case DataChoice.FEELS_LIKE:
        return '°';
      case DataChoice.WIND_SPEED:
        return ' mph';
    }
  };
  const values = dataToDisplay.map((data) => getValue(data));
  const min = Math.min(...values);
  const max = Math.max(...values);

  /**
   * Get the width percentage for the value relative to the entire data set.
   */
  const getTemperatureWidthOffset = (temperature: number): string => {
    // TODO: magic numbers
    const minWidth = 0.42;
    const maxWidth = 0.78;

    const normalizedTemperature = (Math.round(temperature) - min) / (max - min);
    const width = minWidth + normalizedTemperature * (maxWidth - minWidth);

    return `${width * 100}%`;
  };

  return (
    <View style={styles.container}>
      {dataToDisplay.map(
        (
          data: HourlyWeatherData,
          index: number,
          array: HourlyWeatherData[],
        ) => {
          const currentDescription = getWeatherDescription(data.weather[0]);
          const previousDescription = getWeatherDescription(
            array[index - 1]?.weather[0],
          );

          const description =
            currentDescription === previousDescription
              ? null
              : currentDescription;

          const colorBlockStyle =
            index === 0
              ? styles.roundedTop
              : index === array.length - 1
              ? styles.roundedBottom
              : {};

          return (
            <View style={styles.hourLine}>
              <TouchableWithoutFeedback
                onLongPress={() => setShowFull((val) => !val)}>
                <View
                  style={{
                    ...styles.descriptionColorBlock,
                    ...colorBlockStyle,
                    backgroundColor: getWeatherColor(data.weather[0]),
                  }}
                />
              </TouchableWithoutFeedback>

              <Text style={styles.time}>{getTimeString(data.dt, false)}</Text>
              <View
                style={{
                  ...styles.valueLine,
                  width: getTemperatureWidthOffset(getValue(data)),
                }}>
                {description ? (
                  <Text style={styles.description}>{description}</Text>
                ) : null}
                <View style={styles.line} />
                <Text style={styles.value}>
                  {Math.round(getValue(data))}
                  {getUnits()}
                </Text>
              </View>
            </View>
          );
        },
      )}
      <ButtonGroup
        buttons={['Temperature', 'Feels Like', 'Wind Speed']}
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
    padding: 16,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  hourLine: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'center',
  },
  time: {
    width: '14%',
    textAlign: 'right',
  },
  valueLine: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    paddingStart: 12,
    paddingEnd: 8,
  },
  description: {
    fontStyle: 'italic',
    fontSize: 12,
    marginEnd: 8,
  },
  descriptionColorBlock: {
    width: '8%',
    alignSelf: 'stretch',
    backgroundColor: '#ccc',
  },
  roundedTop: {
    borderTopEndRadius: 6,
    borderTopStartRadius: 6,
  },
  roundedBottom: {
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6,
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
    marginTop: 1,
    marginBottom: 1,
    paddingStart: 8,
    padding: 4,
    paddingTop: 3,
    paddingBottom: 3,
    marginStart: 8,
    backgroundColor: '#f3f0f6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#b5b3b8',
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
  header: {
    alignSelf: 'center',
  },
});
