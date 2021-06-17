import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../screens/SignIn';
import { Home } from '../screens/Home';

const { Navigator, Screen } = createStackNavigator();

export function Routes() {
  return (
    <Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#222222' },
      }}
    >
      <Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
    </Navigator>
  );
}
