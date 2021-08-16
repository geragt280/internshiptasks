import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import cssLogin from '../cssFolder/cssLogin';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

const iconFontStyles = `@font-face {
    src: url(${iconFont});
    font-family: FontAwesome;
  }`;

export default function LoginScreen( {navigation} ) {
  const [userInfo, setuserInfo] = useState({});

  const isLogin = userInfo.name;

  const onPressLogin = () => isLogin ? logoutWithFacebook() : loginWithFacebook();

  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name, email',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          setuserInfo({userInfo: result});
          console.log('result:', result);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  function loginWithFacebook(){
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  function logoutWithFacebook () {
    LoginManager.logOut();
    setuserInfo({userInfo: {}});
  };

  function gotoHome(){
      navigation.navigate('Home')
  }

  return (
    <View style={cssLogin.all}>
      <View style={cssLogin.header}>
        <Text style={cssLogin.textLarge}>Login</Text>
      </View>
      <View>
        <TextInput style={cssLogin.textInput} placeholder={'Email'} />
        <TextInput
          style={cssLogin.textInput}
          placeholder={'Password'}
          keyboardType="visible-password"
        />
      </View>

      <View style={cssLogin.middleContainer}>
        <TouchableOpacity style={cssLogin.loginButton}>
          <Icon name="arrow-right-bold" style={cssLogin.buttonLoginText} />
        </TouchableOpacity>

        <TouchableOpacity style={cssLogin.facebookButton} onPress={ () => gotoHome() }>
          <Icon name="facebook" size={30} color="#fff" style={{margin: 5}} />
          <Text style={cssLogin.facebookButtonText}>facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
