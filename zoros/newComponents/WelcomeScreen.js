import React from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import cssWelcome from '../cssFolder/cssWelcome';
import welcomeStyle from '../cssFolder/cssWelcome';

export default function WelcomeScreen({navigation}) {
  function gotoLogin() {
    navigation.navigate('Login');
  }

  return (
    <View style={welcomeStyle.all}>
      <StatusBar hidden />
      <View style={welcomeStyle.headingStyle}>
        <Text style={welcomeStyle.textLarge}>Welcome to zoros</Text>
        <TouchableOpacity
          style={cssWelcome.welcomeButton}
          onPress={() => gotoLogin()}>
          <Text style={cssWelcome.textMedium}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
