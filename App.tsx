import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from './src/Navigation/AppNavigation';
import { GradientProvider } from './src/Context/GradienContex';

export default function App() {
  return (
    <NavigationContainer>
      <GradientProvider>
        <AppNavigation />
      </GradientProvider>
    </NavigationContainer>
  );
}