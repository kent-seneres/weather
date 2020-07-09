import React from 'react';
import {SafeAreaView, ScrollView, Text, StatusBar} from 'react-native';
import useCurrentPosition from './hooks/useCurrentPosition';
import Config from 'react-native-config';

const App = () => {
  const currentPositionState = useCurrentPosition();

  React.useEffect(() => {
    if (currentPositionState) {
      console.log(currentPositionState);
    }

    console.log(Config.OWM_APP_ID);
  }, [currentPositionState]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text style={{textAlign: 'center'}}>Weather</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
