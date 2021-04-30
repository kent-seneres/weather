import React from 'react';
import {View, StyleSheet, Image, TouchableNativeFeedback} from 'react-native';
import {Text} from 'react-native-elements';
import {CurrentWeatherData} from '../core/types';
import getTimeString from '../helpers/getTimeString';
import getIcon from '../helpers/getIcon';
import {SHOW_DETAILS_DURATION_MS} from '../core/constants';

export interface CurrentWeatherProps {
  data: CurrentWeatherData;
  locationString: string;
  onLongPress: () => void;
}

/**
 * Component that shows the current weather data.
 */
export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  data,
  locationString,
  onLongPress,
}) => {
  const [showDetails, setShowDetails] = React.useState<boolean>(true);

  /**
   * Effect to show the auxiliary weather details and
   * automatically dismiss it after a few seconds.
   */
  React.useEffect(() => {
    setShowDetails(true);

    const timeoutId = setTimeout(() => {
      setShowDetails(false);
    }, SHOW_DETAILS_DURATION_MS);

    // clear the timeout if timestamp changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [data.dt]);

  return (
    <TouchableNativeFeedback
      onPress={() => setShowDetails((v) => !v)}
      onLongPress={onLongPress}>
      <View style={styles.container}>
        {showDetails ? (
          <>
            <Text style={styles.timestamp}>
              Updated: {new Date(data.dt * 1000).toLocaleString()}
            </Text>
            <Text style={styles.placeText}>{locationString}</Text>
          </>
        ) : null}
        <View style={styles.currentContainer}>
          <Image style={styles.icon} source={getIcon(data.weather[0].icon)} />
          <View style={styles.temperatureContainer}>
            <Text h2>{Math.round(data.temp)}°</Text>
            <Text>Feels {Math.round(data.feels_like)}°</Text>
          </View>
        </View>
        <Text>
          Sunrise {getTimeString(data.sunrise)}
          {'; '}
          Sunset {getTimeString(data.sunset)}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperatureContainer: {
    marginBottom: 4,
  },
  currentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    height: '100%',
    marginEnd: 12,
  },
  timestamp: {
    marginTop: 4,
    fontStyle: 'italic',
  },
  placeText: {
    padding: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
