import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import React from 'react';

enum Actions {
  LOAD = 'LOAD',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

interface CurrentPositionData {
  timestamp: Date;
  lat: number;
  lon: number;
}

interface CurrentPositionState {
  isLoading: boolean;
  isError: boolean;
  data: CurrentPositionData | null;
}

const initialState: CurrentPositionState = {
  isLoading: false,
  isError: false,
  data: null,
};

const currentPositionReducer: React.Reducer<CurrentPositionState, any> = (
  state,
  action,
) => {
  switch (action.type) {
    case Actions.LOAD:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case Actions.SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case Actions.FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useCurrentPosition = () => {
  const [permissionGranted, setPermissionGranted] = React.useState(false);

  const [state, dispatch] = React.useReducer(
    currentPositionReducer,
    initialState,
  );

  /**
   * Effect hook that requests location permission and updates
   * the `permissionGranted` state accordingly.
   */
  React.useEffect(() => {
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

    requestLocationPermission();
  }, []);

  /**
   * Effect hook that fetches the current position once the location permission has been granted.
   */
  React.useEffect(() => {
    if (!permissionGranted) {
      return;
    }

    dispatch({type: Actions.LOAD});
    Geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: Actions.SUCCESS,
          payload: {
            timestamp: position.timestamp,
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
        });
      },
      (error) => {
        dispatch({
          type: Actions.FAIL,
          payload: error.message,
        });
      },
    );
  }, [permissionGranted]);

  return {
    state,
  };
};

export default useCurrentPosition;
