import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import React from 'react';
import {Coordinates} from './types';

const useCurrentPosition = () => {
  const [permissionGranted, setPermissionGranted] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState<Coordinates>(null);

  const requestLocationPermission = async () => {
    try {
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

      setPermissionGranted(result === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
      console.warn(err);
    }
  };

  React.useEffect(() => {
    requestLocationPermission();
  }, []);

  React.useEffect(() => {
    if (permissionGranted) {
      Geolocation.getCurrentPosition((position) =>
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }),
      );
    }
  }, [permissionGranted]);

  return {
    coordinates,
  };
};

export default useCurrentPosition;
