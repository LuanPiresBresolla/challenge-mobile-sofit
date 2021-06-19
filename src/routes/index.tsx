import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn } from '../screens/SignIn';
import { Home } from '../screens/Home';
import { ListExpenses } from '../screens/ListExpenses';
import { FormExpenses } from '../screens/FormExpenses';

const { Navigator, Screen } = createStackNavigator();

export function Routes() {
  return (
    <Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#ffffff' },
        headerTintColor: '#1e64a1',
        headerTitleAlign: 'center',
        headerTitleStyle: { color: '#1e64a1' },
      }}
    >
      <Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Screen
        name="Home"
        component={Home}
        options={{ title: 'Inicio', headerLeft: () => null }}
      />
      <Screen
        name="ListExpenses"
        component={ListExpenses}
        options={{ title: 'Despesas' }}
      />
      <Screen
        name="FormExpenses"
        component={FormExpenses}
        options={{ title: 'Adicionar despesa' }}
      />
    </Navigator>
  );
}
