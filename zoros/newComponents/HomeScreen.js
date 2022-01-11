import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  NativeModules,
  LayoutAnimation,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  Animated,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  StatusBar,
  ToastAndroid,
  PermissionsAndroid,
  NativeAppEventEmitter
} from 'react-native';
import {withBadge, Badge, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import styles from '../cssFolder/cssHome';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
const {width, height} = Dimensions.get('window');
import SlidingPanel from './SliderPanel';
import DataFile from './DataFile';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header as HeaderRNE, HeaderProps} from 'react-native-elements';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import TrackPlayer from 'react-native-track-player';
import TrackClass from './componentClasses/TrackClass';
import TrackServiceClass from './componentClasses/TrackServiceClass';

const {UIManager} = NativeModules;
const black = '#0D0D0D';
var Track;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);


export default function HomeScreen({route, navigation}) {
  const [variantHeight, setVariantHeight] = useState({h: 0});
  const [displayFlag, setdisplayFlag] = useState('none');
  const [searchFlag, setsearchFlag] = useState(false);
  const [panelVisible, setpanelVisible] = useState(true);
  const childRef = useRef();
  const [localSongsList, setlocalSongsList] = useState([]);
  // const firstSongItem = [];
  // if (localSongsList) {
  //   firstSongItem.push({
  //     tname:localSongsList[0].name,
  //     tsinger: localSongsList[0].singer,
  //     tprice: localSongsList[0].price,
  //     turi: localSongsList[0].uri,
  //   });
  // }
  const [sngDetail, setsngDetail] = useState(
    {
      tname:"",
      tsinger: "",
      tprice: "",
      turi: "",
    }
  );

  useEffect(async () => { 
    permissionCheck();
    // await TrackPlayer.registerPlaybackService(() => listnerFunctions());  
  }, []);

  function listnerFunctions() {

    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop());

    TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext());

    TrackPlayer.addEventListener('remote-previous', () => TrackPlayer.skipToPrevious());    
};

  function permissionCheck(){
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(async (result) => {
      // … 
      await TrackPlayer.setupPlayer({});
      console.log('The permission is granted');
      await DataFile(async (itemArr) => {
        ToastAndroid.show("Items found are " + itemArr.length, ToastAndroid.LONG);
        setlocalSongsList(itemArr);
        Track = new TrackClass(itemArr);
        await Track.Collect_all();
      });
    });

  }

  const FirstRoute = () => (
    <View style={styles.tabviewSinglePage}>
      <View style={styles.all}>
        <ScrollView nestedScrollEnabled={true}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
            {localSongsList.map((item, index) => (
              <View key={index} style={{ width:'50%'}}>
                <TouchableOpacity onPress={() => SelectSong(item) }>
                  <SingleLineItems attrname={item.name} attruri={item.uri} thumb={item.thumb} />
                </TouchableOpacity>
              </View> 
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );

  const SingleLineItems = ({attrname, attruri, key, thumb}) => {
    // console.log("singlelineitem.",attrname, attruri, thumb);
    var imageSource = attruri;
    if (thumb) {
      imageSource = thumb;
    }
    return (
      <View style={styles.renderedSingleItemCommercialPageItem}>
        <Image
          style={styles.renderedItemImageStyling}
          source={{uri: imageSource}}
          width={150}
          height={150}></Image>
        <Text style={styles.renderedItemTextOnImage}>{attrname}</Text>
      </View>
    );
  };

  const SecondRoute = () => (
    <View style={styles.tabviewSinglePage}>
      <Image
        source={{
          uri: 'https://www.seekpng.com/png/full/17-175297_jouissance-the-king-s-avatar-zhou-zekai-discord.png',
        }}
        width={50}
        height={50}></Image>
      <Text>Hello Native</Text>
    </View>
  );

  async function SelectSong(item) {
    var imageSource = item.uri;
    if (item.thumb) {
      console.log('thumbnail setted.');
      imageSource = item.thumb;
    }
    setpanelVisible(true);
    sngDetail.tname = item.name;
    sngDetail.tprice = item.price;
    sngDetail.tsinger = item.singer;
    sngDetail.turi = imageSource;
    const path = item.songPath;
    let trackIndex = await Track.playSong(sngDetail.tname);
    console.log("track index:", trackIndex);
    childRef.current.updatingFunction(sngDetail.tname, sngDetail.tsinger, sngDetail.tprice, sngDetail.turi, path, 'mp3');
  }

  function searchIconClick() {
    // Animate the update
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (!searchFlag) {
      setVariantHeight({h: variantHeight.h + 200});
      setdisplayFlag('flex');
      setsearchFlag(true);
      
    } else if (searchFlag) {
      setVariantHeight({h: variantHeight.h - 200});
      setdisplayFlag('none');
      setsearchFlag(false);      
    }
  }

  const layout = useWindowDimensions();
  const renderLabel = ({route, focused, color}) => (
    <Text style={styles.tabBarLabelStyle}>{route.title}</Text>
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
      {key: 'commercial', title: 'Commercial'},
      {key: 'freelicence', title: 'Free Licence'},
    ]);

    const renderScene = SceneMap({
      commercial: FirstRoute,
      freelicence: SecondRoute,
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
    <SafeAreaView style={styles.all}>
      <StatusBar hidden={true} />
      <HeaderRNE
        backgroundColor={black}
        containerStyle={{ borderBottomColor:black,borderBottomWidth:1 }}
        leftComponent={
          <View>
            <TouchableOpacity >
            <Icon name="microsoft-bing" size={40} style={styles.iconColorGolden} />
            </TouchableOpacity>
          </View>
        }
        rightComponent={
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={() => searchIconClick()}>
              <Icon
                  name="magnify"
                  size={35}
                  style={[{marginTop: 5, marginRight: 10}, styles.iconColorWhite]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('')} >
                <Icon
                    name="cart-outline"
                    size={30}
                    style={[{margin: 5}, styles.iconColorWhite]}
                  />
                  <Badge
                    status=""
                    containerStyle={styles.cartIconBadgeStyle}
                    badgeStyle={styles.cartIconBadgeStyle}
                    textStyle={{ color:black}}
                    value="1"
                  />
              </TouchableOpacity>
            </View>
        }
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.all} >
        <View style={[styles.box, {height: variantHeight.h}]}>
          <View style={styles.searchTextContainer}>
            <Text style={[styles.textMedium, {display: displayFlag}]}>
              Find The best music for your banger
            </Text>

            <View style={[styles.searchContainer, {display: displayFlag}]}>
              <View>
                <Icon
                  name="magnify"
                  size={30}
                  color="#fff"
                  style={{marginTop: 10, paddingLeft: 15, position: 'relative'}}
                />
              </View>
              <View>
                <TextInput
                  style={{
                    fontSize: 20,
                    color: '#fff',
                    position: 'relative',
                    width: 250,
                  }}
                  placeholder="Search"
                  color="#fff"
                  placeholderTextColor="#fff"
                />
              </View>
            </View>
          </View>
        </View>

          <View style={[styles.tabviewContainer, (localSongsList.length > 6) ? {marginBottom:80} : console.log(false)]} >
            <TabViewRender  />

          </View>


      </View>
      </ScrollView>
      { panelVisible ? <SlidingPanel ref={childRef} nav={navigation} /> : null}
    </SafeAreaView>
  );
}

const gray = '#252525';
const styler = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styles.black,
  },
  bodyViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLayoutStyle: {
    flexDirection: 'row',
    width,
    height: 150,
    backgroundColor: gray,
    paddingVertical: 12,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    opacity: 0.8,
    zIndex: 0,
  },
  slidingPanelLayoutStyle: {
    width,
    height: height,
    backgroundColor: gray,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  commonTextStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
