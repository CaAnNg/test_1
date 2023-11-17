// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ScanQR from './ScanQR'; // Import the ScanQR component
import GenScreen from './GenScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scan" component={ScanQR} />
        <Stack.Screen name="Gen" component={GenScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
