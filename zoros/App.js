import * as React from 'react';
import {Button, StyleSheet, Text, View, StatusBarHidden} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './newComponents/HomeScreen';
import WelcomeScreen from './newComponents/WelcomeScreen';
import NavigatorScreen from './newComponents/NavigatorScreen';
import LoginScreen from './newComponents/LoginScreen';
import ChatScreen from './newComponents/ChatScreen';
import ProfileScreen from './newComponents/ProfileScreen';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import styles from './cssFolder/cssApp';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const black = '#0D0D0D';
const golden = '#F7933D';
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return (
              <View style={styles.tabBarSingleItem}>
                <Icon name="home" size={22} color={focused ? golden : color} />
                <Text style={[ {color: focused ? golden : color, }, styles.tabBarSingleItemTextStyle]}>
                  Home
                </Text>
              </View>
            );
          } else if (route.name === 'Navigator') {
            return (
              <View style={styles.tabBarSingleItem}>
                <Icon
                  name="compass"
                  size={22}
                  color={focused ? golden : color}
                />
                <Text style={[ {color: focused ? golden : color, }, styles.tabBarSingleItemTextStyle]}>
                  Navigator
                </Text>
              </View>
            );
          } else if (route.name === 'Chat') {
            return (
              <View style={styles.tabBarSingleItem}>
                <Icon
                  name="chat-processing-outline"
                  size={22}
                  color={focused ? golden : color}
                />
                <Text style={[ {color: focused ? golden : color, }, styles.tabBarSingleItemTextStyle]}>
                  Chat
                </Text>
              </View>
            );
          } else if (route.name === 'Profile') {
            return (
              <View style={styles.tabBarSingleItem}>
                <Icon
                  name="account-outline"
                  size={22}
                  color={focused ? golden : color}
                />
                <Text style={[ {color: focused ? golden : color, }, styles.tabBarSingleItemTextStyle]}>
                  Profile
                </Text>
              </View>
            );
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: black,
          bottom: 10,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 15,
          height: 70,
          position: 'absolute',
          borderColor: black,
          zIndex: 0,
        },
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Navigator" component={NavigatorScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            component={LoginScreen}
            options={{
              headerStyle: {
                backgroundColor: '#F7933D',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center',
              },
              headerTintColor: '#0D0D0D',
              title: 'zoros             ',
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
