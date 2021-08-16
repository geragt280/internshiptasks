import React, {Component} from 'react';
import {View, Text, Image, Button} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class mainlayout extends Component {
    state = {userInfo: {}};
  
    moveToSecondActivity = () =>
    {
       this.props.navigation.navigate('profile');
    };

    getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        return jsonValue != null ? this.moveToSecondActivity() : console.log('empty memory');
      } catch(e) {
        console.log('error in get data' + e);
      }
    }

    componentDidMount(){
      this.getData();
    }

    getInfoFromToken = token => {
      const PROFILE_REQUEST_PARAMS = {
        fields: {
          string: 'id, name,  first_name, last_name, email, picture.type(large)',
        },
      };
      const profileRequest = new GraphRequest(
        '/me',
        {token, parameters: PROFILE_REQUEST_PARAMS},
        (error, result) => {
          if (error) {
            console.log('login info has error: ' + error);
          } else {
            this.setState({userInfo: result});
            console.log('result:', result);
            try{
              const jsonValue = JSON.stringify(this.state.userInfo);
              AsyncStorage.setItem('@storage_Key', jsonValue);
              console.log('values saved.');
              this.moveToSecondActivity();
            }
            catch(e)
            {
              console.log(e);
            }
          }
        },
      );
      new GraphRequestManager().addRequest(profileRequest).start();
    };
  
    

    
    render() {
      return (
        
        <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor:"#3b5998"}}>
          <Text style={{fontSize: 20,margin:20}}>Login With Facebook</Text>
          <LoginButton  style={{width:250, padding:10, margin:10, alignContent:'center', justifyContent:'center',flex:.02}}
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  const accessToken = data.accessToken.toString();
                  this.getInfoFromToken(accessToken);
                  this.moveToSecondActivity;
                });
              }
              
            }}
            onLogoutFinished={() => this.setState({userInfo: {}})}
            />
          {
            this.state.userInfo.name && (
                <View style={{alignItems:'center'}}>
                    <Image style={{width:200, height:200}} source={{uri:this.state.userInfo.picture.data.url}}></Image>
                    <Text style={{fontSize: 16, marginVertical: 16}}>
                        Logged in As {this.state.userInfo.name} And id is {this.state.userInfo.id}
                    </Text>
                </View>
            
            )
          }
        </View>
      );
    }
  }

  
