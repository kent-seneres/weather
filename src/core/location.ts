import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

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
