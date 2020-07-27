import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import InputScreen from '../screens/InputScreen'
import SummaryScreen from '../screens/SummaryScreen'

const Stack = createStackNavigator()

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Input"
        component={InputScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Summary"
        component={SummaryScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation