import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MovieScreen } from '../screens/MovieDescription';
import { Movie } from '../../@types/theMovieDB';

export type RootStackParams = {
  appHome: undefined,
  appMovie: Movie,
}

const Stack = createStackNavigator<RootStackParams>();

export const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="appHome" component={HomeScreen} />
      <Stack.Screen name="appMovie" component={MovieScreen} />
    </Stack.Navigator>
  );
}