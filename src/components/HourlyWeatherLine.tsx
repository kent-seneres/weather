import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import getTimeString from '../helpers/getTimeString';

export interface HourlyWeatherLineProps {
  timestamp: number;
  color: string;
  roundedTop: boolean;
  roundedBottom: boolean;
  description: string;
  offsetPercent: number;
  value: string | number;
  unit: string;
  onPress: () => void;
}

const TIME_WIDTH_PERCENT = 0.14;
const COLOR_WIDTH_PERCENT = 0.08;
const MAX_WIDTH = 1 - TIME_WIDTH_PERCENT - COLOR_WIDTH_PERCENT;

// minimum width for the data line, to account for the description and value text
const MIN_WIDTH = 0.42;

/**
 * Single row of hourly data that shows the time, condition, and
 * the data value, spaced according to the given offset.
 */
export const HourlyWeatherLine: React.FC<HourlyWeatherLineProps> = ({
  timestamp,
  color,
  roundedTop = false,
  roundedBottom = false,
  description,
  offsetPercent,
  value,
  unit,
  onPress,
}) => {
  const colorBlockStyle = {
    ...(roundedTop ? styles.roundedTop : {}),
    ...(roundedBottom ? styles.roundedBottom : {}),
  };

  const width = MIN_WIDTH + offsetPercent * (MAX_WIDTH - MIN_WIDTH);
  const widthPercent = `${width * 100}%`;

  return (
    <TouchableWithoutFeedback onLongPress={onPress}>
      <View style={styles.container}>
        <View
          style={{
            ...styles.descriptionColorBlock,
            ...colorBlockStyle,
            backgroundColor: color,
          }}
        />

        <Text style={styles.time}>{getTimeString(timestamp, false)}</Text>
        <View
          style={{
            ...styles.valueLine,
            width: widthPercent,
          }}>
          {description ? (
            <Text style={styles.description}>{description}</Text>
          ) : null}
          <View style={styles.line} />
          <Text style={styles.value}>
            {value}
            {unit}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'center',
    paddingStart: 16,
    paddingEnd: 16,
  },
  time: {
    width: `${TIME_WIDTH_PERCENT * 100}%`,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  valueLine: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    paddingStart: 12,
  },
  description: {
    fontStyle: 'italic',
    fontSize: 12,
    marginEnd: 8,
  },
  descriptionColorBlock: {
    width: `${COLOR_WIDTH_PERCENT * 100}%`,
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
    flexGrow: 1,
    height: 1,
    backgroundColor: '#d9d7dc',
  },
  value: {
    marginVertical: 1,
    paddingVertical: 3,
    paddingStart: 8,
    paddingEnd: 5,
    marginStart: 8,
    backgroundColor: '#f3f0f6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9d7dc',
    fontWeight: 'bold',
  },
});
