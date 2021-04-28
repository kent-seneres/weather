import React from 'react';
import {View, StyleSheet, Image, TouchableNativeFeedback} from 'react-native';
import {Text} from 'react-native-elements';
import getIcon from '../helpers/getIcon';
import getDayString from '../helpers/getDayString';
import Icon from 'react-native-vector-icons/Feather';

export interface DailyWeatherLineProps {
  timestamp: number;
  iconId: string;
  pop: number;
  minValue: string;
  maxValue: string;
  widthPercent: number;
  offsetPercent: number;
  onPress: () => void;
}

const TIME_WIDTH_PERCENT = 0.14;
const ICON_WIDTH_PERCENT = 0.1;
const MAX_WIDTH = 1 - TIME_WIDTH_PERCENT - ICON_WIDTH_PERCENT;
const MAX_LINE_WIDTH = MAX_WIDTH - 0.06;

const PRECIP_COLOR = '#5fa0ea';

/**
 * Single row of daily data that shows the day, condition icon,
 * min and max temperature, spaced according to the given offset and width.
 */
export const DailyWeatherLine: React.FC<DailyWeatherLineProps> = ({
  timestamp,
  iconId,
  pop,
  minValue,
  maxValue,
  widthPercent,
  offsetPercent,
  onPress,
}) => {
  const offset = `${offsetPercent * MAX_WIDTH * 100}%`;
  const width = `${widthPercent * MAX_LINE_WIDTH * 100}%`;

  const formatPrecipitationPercent = (p: number): string => {
    return `${p * 100}%`;
  };

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>
            {getDayString(timestamp).toUpperCase()}
          </Text>
          <View style={styles.popContainer}>
            <Icon name="droplet" size={10} color={PRECIP_COLOR} />
            <Text style={styles.pop}>{formatPrecipitationPercent(pop)}</Text>
          </View>
        </View>
        <Image style={styles.icon} source={getIcon(iconId)} />
        <View style={styles.valueLine}>
          <View
            style={{
              width: offset,
            }}
          />
          <Text style={styles.value}>{minValue}</Text>
          <View
            style={{
              ...styles.line,
              width: width,
            }}
          />
          <Text style={styles.value}>{maxValue}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
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
  timeContainer: {
    width: `${TIME_WIDTH_PERCENT * 100}%`,
    flexDirection: 'column',
  },
  time: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  popContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pop: {
    fontSize: 10,
    paddingStart: 2,
    color: PRECIP_COLOR,
    fontWeight: 'bold',
  },
  icon: {
    width: `${ICON_WIDTH_PERCENT * 100}%`,
  },
  valueLine: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    paddingStart: 12,
    paddingEnd: 12,
  },
  line: {
    width: 50,
    height: 28,
    backgroundColor: '#f3f0f6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d9d7dc',
    marginStart: 4,
    marginEnd: 4,
  },
  value: {
    padding: 0,
    fontWeight: 'bold',
  },
});
