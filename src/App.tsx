import React from 'react';
import {SafeAreaView, ScrollView, Text, StatusBar} from 'react-native';
import useCurrentPosition from './useCurrentPosition';

const App = () => {
  const coordinates = useCurrentPosition();

  React.useEffect(() => {
    if (coordinates) {
      console.log(coordinates);
    }
  }, [coordinates]);

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
