import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Image,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {withBadge, Badge, Avatar} from 'react-native-elements';
// import SlidingPanel from 'react-native-sliding-up-down-panels';
import SlidingPanel from './Panel';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import styles from '../cssFolder/cssNavigator';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {color} from 'react-native-elements/dist/helpers';
import {CommonActions} from '@react-navigation/native';
import itemArr from './DataFile';

const black = '#0D0D0D';
const golden = '#F7933D';
const white = '#fff';

const profileImage =
  'https://image.shutterstock.com/image-photo/profile-picture-smiling-millennial-asian-260nw-1836020740.jpg';

const FirstRoute = () => (
  <View style={styles.tabviewSinglePage}>
    <View style={{marginTop: 20}}>
      <ScrollView>
        {itemArr.map((item, index) => (
          <View key={index} style={{flexDirection: 'row'}}>
            <SingleLineItems
              attrname={item.name}
              attruri={item.uri}
              attrpri={item.price}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  </View>
);

const SecondRoute = () => (
  <View style={styles.tabviewSinglePage}>
    <Image
      source={{
        uri: 'https://www.seekpng.com/png/full/17-175297_jouissance-the-king-s-avatar-zhou-zekai-discord.png',
      }}
      style={{width: 50, height: 50}}></Image>
    <Text>Hello Native</Text>
  </View>
);

const SingleLineItems = ({attrname, attruri, attrpri, key}) => {
  return (
    <View
      style={{
        right: 5,
        marginHorizontal: 0,
        marginTop: 0,
        alignItems: 'center',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width,
      }}>
      <View style={{flexDirection: 'row', marginRight: 20}}>
        <View>
          <Image
            source={{uri: attruri}}
            style={{width: 50, height: 50, borderRadius: 20}}
          />
        </View>
        <View style={{marginHorizontal: 15}}>
          <Text
            style={[
              styles.iconColorWhite,
              {marginBottom: 5, fontWeight: 'bold'},
            ]}>
            {attrname}
          </Text>
          <View style={styles.profileSetting}>
            <Text style={{color: 'gray'}}>Valetudo Beats</Text>
            <Text
              style={{color: 'gray', fontWeight: 'bold', marginHorizontal: 10}}>
              ${attrpri}
            </Text>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginLeft: 0}}>
        <Icon
          name="cart"
          size={30}
          style={[{margin: 5}, styles.iconColorGray]}
        />
        <Icon
          name="dots-horizontal-circle-outline"
          size={30}
          style={[{margin: 5}, styles.iconColorGray]}
        />
      </View>
    </View>
  );
};

export default function NavigatorScreen({navigation}) {
  const [swipeUpDownFlag, setSwipeUpDownFlag] = useState(false);
  const [radiusLenght, setRadiusLenght] = useState(0);
  const [boxSize, setboxSize] = useState({h: 1});
  const [displayFlag, setdisplayFlag] = useState('none');

  function changeLayoutStyles() {
    if (!swipeUpDownFlag) {
      setRadiusLenght(50);
      setSwipeUpDownFlag(true);
    } else if (swipeUpDownFlag) {
      setRadiusLenght(0);
      setSwipeUpDownFlag(false);
    }
  }

  const layout = useWindowDimensions();
  const renderLabel = ({route, focused, color}) => (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      style={styles.tabBarLabelStyle}>
      {route.title}
    </Text>
  );
  const TabViewRender = () => {
    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={styles.tabBarIndicatorColor}
        style={styles.tabBarBackgroundColor}
        renderLabel={renderLabel}
      />
    );
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      {key: 'tracks', title: 'Tracks'},
      {key: 'albums', title: 'Albums'},
      {key: 'review', title: 'Review'},
      {key: 'contacts', title: 'Contacts'},
    ]);

    const renderScene = SceneMap({
      tracks: FirstRoute,
      albums: SecondRoute,
      review: SecondRoute,
      contacts: SecondRoute,
    });

    return (
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, {flex: boxSize.h}]}>
        <View style={styles.iconAligner}>
          <View>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.dispatch({
                  ...CommonActions.goBack(),
                })
              }>
              <Icon
                name="chevron-left"
                size={40}
                style={styles.iconColorGray}
              />
            </TouchableWithoutFeedback>
          </View>
          <View>
            <Text style={styles.profileNameText}>Beatmaker's Profile</Text>
          </View>
          <View style={styles.nestedIconAligner}>
            <TouchableWithoutFeedback onPress={() => console.log('')}>
              <View>
                <Icon
                  name="dots-horizontal-circle-outline"
                  size={30}
                  style={[{margin: 5}, styles.iconColorGray]}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        {/* profile section here  */}
        <View style={styles.pofileDetailsSections}>
          <View>
            <Image
              source={{uri: profileImage}}
              style={styles.profileImageStyle}
            />
          </View>
          <View>
            <Text style={styles.sellerTypeStyle}>Pro Seller</Text>
            <Text
              style={{
                color: white,
                fontSize: 20,
                marginHorizontal: 5,
                marginTop: 10,
              }}>
              Valetudo Beats
            </Text>
            <Text
              style={{color: 'gray', fontWeight: 'bold', marginHorizontal: 5}}>
              Canada
            </Text>
            <View
              style={[
                styles.profileSetting,
                {justifyContent: 'space-between'},
              ]}>
              <View
                style={{
                  alignItems: 'center',
                  marginVertical: 10,
                  marginRight: 15,
                  marginLeft: 5,
                }}>
                <Text style={styles.profilePopularityDetailsInformationText}>
                  54
                </Text>
                <Text style={styles.profilePopularityDetailsNameText}>
                  Tracks
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  marginVertical: 10,
                  marginHorizontal: 15,
                }}>
                <Text style={styles.profilePopularityDetailsInformationText}>
                  3
                </Text>
                <Text style={styles.profilePopularityDetailsNameText}>
                  Albums
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  marginVertical: 10,
                  marginHorizontal: 15,
                }}>
                <Text style={styles.profilePopularityDetailsInformationText}>
                  12K
                </Text>
                <Text style={styles.profilePopularityDetailsNameText}>
                  Subscribers
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Profile interaction buttons */}
        <View style={styles.profileButtonPortion}>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>Subscribe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startChatButton}>
            <Text style={styles.startChatButtonText}>Start a chat</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabviewContainer}>
        <TabViewRender />
      </View>

      <View>
        <SlidingPanel
          nav={navigation}
          songname={'Insomnia'}
          singername={'Velentine'}
          pricedetails={'30'}
          songUriDetails={
            'https://picturepan2.github.io/spectre/img/avatar-3.png'
          }
        />
      </View>
    </View>
  );
}
