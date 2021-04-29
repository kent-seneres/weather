import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {USE_MOCK_LOCATION} from './constants';

export interface CurrentLocationData {
  timestamp: number;
  lat: number;
  lon: number;
}

const requestLocationPermission = async (): Promise<boolean> => {
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Weather Location Permission',
      message: 'Location required to find current weather',
      buttonNeutral: 'Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );

  return result === PermissionsAndroid.RESULTS.GRANTED;
};

/**
 * Request location permission before attempting to get the current position.
 */
const getLocation = async (): Promise<CurrentLocationData> => {
  const permissionGranted = await requestLocationPermission();
  if (!permissionGranted) {
    return Promise.reject('Location permission required.');
  }

  return new Promise((resolve, reject) => {
    if (USE_MOCK_LOCATION) {
      resolve({
        timestamp: Date.now(),
        lat: 43.1,
        lon: -70.1,
      });
    }

    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          timestamp: position.timestamp,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(error.message);
      },
      {timeout: 15000, maximumAge: 10000},
    );
  });
};

export {getLocation};
