import React from 'react'
import { View, Text } from 'react-native'
import mainlayout from './mainlayout';
import profiledetails from './profiledetails'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="main" component={mainlayout} options={{headerShown:false}}/>
        <Stack.Screen name="profile" component={profiledetails} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

