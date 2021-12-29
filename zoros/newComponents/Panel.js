import React, {Component} from 'react';
import styles from '../cssFolder/cssSlidingPanel';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import SlidingPanel from 'react-native-sliding-up-down-panels';
import itemArr from './DataFile';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import imgFrame from '../assits/image_frame.png';
import SoundPlayer from 'react-native-sound-player';

export default class Panel extends Component {
  constructor() {
    super();
    this.state = {
      playButtonFlag: 'play-circle',
      smallPlayButtomFlag: 'play',
      musicPlayStatus: false,
      swipeUpDownFlag: false,
      radiusLenght: 0,
      headerDisplayStatus: 'flex',
      panelLayoutDisplayStatus: 'none',
      panelPosition: 'bottom',
      songSelectedFlag: false,
      panelHeaderHeight: 160,
      songname: itemArr[0].name,
      singername: itemArr[0].singer,
      price: itemArr[0].price,
      picuri: itemArr[0].uri,
    };
  }

  componentDidMount() {
    // console.log("component loaded.")
    setInterval(() => {
      this.setState({
        songname: this.props.songname,
        singername: this.props.singername,
        price: this.props.pricedetails,
        picuri: this.props.songUriDetails,
      });
      console.log('current values coming', this.state.songname, this.state.singername,this.state.price);
    }, 1000); 
  }

  playandpause() {
    try {
      // play the file tone.mp3
      if (!this.state.musicPlayStatus) {
        SoundPlayer.playSoundFile('balam_pichkari', 'mp3');
        console.log('me chala');
        //setplayButtonFlag('pause');
        this.setState({playButtonFlag: 'pause-circle'});
        this.setState({smallPlayButtomFlag: 'pause'});
        this.setState({musicPlayStatus: true});
        //setmusicPlayStatus(true);
      } else if (this.state.musicPlayStatus) {
        SoundPlayer.pause();
        // setmusicPlayStatus(false);
        // setplayButtonFlag('play');
        console.log('me bhi chala');
        this.setState({playButtonFlag: 'play-circle'});
        this.setState({smallPlayButtomFlag: 'play'});
        this.setState({musicPlayStatus: false});
      }
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  }

  ClosePlayer() {
    if (!this.state.songSelectedFlag) {
      this.setState({panelHeaderHeight: 100, headerDisplayStatus: 'none'});
    }
  }

  animationStart() {
    let navigation = this.props.nav;
    //const {navigation} = this.props;
    if (!this.state.swipeUpDownFlag) {
      this.setState({radiusLenght: 50});
      this.setState({swipeUpDownFlag: true});
      this.setState({headerDisplayStatus: 'none'});
      this.setState({panelLayoutDisplayStatus: 'flex'});
      navigation.setOptions({
        tabBarVisible: false,
      });
    } else if (this.state.swipeUpDownFlag) {
      this.setState({radiusLenght: 0});
      this.setState({swipeUpDownFlag: false});
      this.setState({headerDisplayStatus: 'flex'});
      this.setState({panelLayoutDisplayStatus: 'none'});
      this.setState({panelPosition: 'bottom'});
      navigation.setOptions({
        tabBarVisible: true,
      });
    }
  }

  render() {
    return (
      <SlidingPanel
        AnimationSpeed={500}
        allowDragging={true}
        headerLayoutHeight={this.state.panelHeaderHeight}
        onAnimationStart={() => this.animationStart()}
        onDragStart={() => this.animationStart()}
        panelPosition={this.state.panelPosition}
        headerLayout={() => (
          <View
            style={[
              styles.headerLayoutStyle,
              {
                borderTopStartRadius: this.state.radiusLenght,
                borderTopRightRadius: this.state.radiusLenght,
              },
            ]}>
            <View
              style={[
                styles.flexDirectionRow,
                {display: this.state.headerDisplayStatus},
              ]}>
              {/* <View style={[styles.flexDirectionRow]}> */}
              <View>
                <Image
                  source={ {uri: this.state.picuri} }
                  style={styles.headerImage}
                />
              </View>
              <View style={{paddingHorizontal: 10}}>
                <Text style={styles.commonTextStyle}>
                  {this.state.songname}
                </Text>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.textColorGray}>
                    {this.state.singername}
                  </Text>
                  <Text style={[styles.textColorWhite]}>
                    {' '}
                    ${this.state.price}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.flexDirectionRow,
                {display: this.state.headerDisplayStatus},
              ]}>
              <TouchableOpacity>
                <Icon
                  name={this.state.smallPlayButtomFlag}
                  size={30}
                  style={styles.iconStyleHeader}
                  onPress={() => this.playandpause()}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="close-outline"
                  size={30}
                  style={styles.iconStyleHeader}
                  onPress={() => this.ClosePlayer()}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        slidingPanelLayout={() => (
          <View style={[styles.slidingPanelLayoutStyle]}>
            <View
              style={[
                styles.imageSectionPanelLayout,
                {display: this.state.panelLayoutDisplayStatus},
              ]}>
              <Image
                source={imgFrame}
                style={styles.centerImageFrameSlidePanel}
              />
              <Image
                source={{uri: this.state.picuri }}
                style={styles.centerImageSlidePanel}
              />
            </View>
            <View
              style={[
                styles.songDetailPanelContainer,
                {display: this.state.panelLayoutDisplayStatus},
              ]}>
              <View style={styles.songsDetailStyle}>
                <View>
                  <Text style={styles.songNameLargeText}>
                    {this.state.songname}
                  </Text>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.textColorGray}>
                      {this.state.singername}
                    </Text>
                    <Text style={styles.textColorWhiteBold}>
                      ${this.state.price}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', top: 5}}>
                  <Icon
                    name="heart-outline"
                    size={30}
                    style={[styles.iconColorGray, {marginHorizontal: 10}]}
                  />
                  <Icon
                    name="ellipsis-horizontal-circle-outline"
                    size={30}
                    style={[styles.iconColorGray, {marginHorizontal: 10}]}
                  />
                </View>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <Animated.View
                    style={[
                      StyleSheet.absoluteFill,
                      {backgroundColor: 'white', width: '30%'},
                    ]}
                  />
                </View>
                <Text style={styles.progressBarStartTime}>1:36</Text>
                <Text style={styles.progressBarEndTime}>4:01</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity>
                  <Icon
                    name="play-skip-back"
                    size={25}
                    style={[styles.iconColorWhite, {marginRight: 8}]}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.playandpause()}>
                  <Icon
                    name={this.state.playButtonFlag}
                    size={60}
                    style={[styles.iconColorWhite, {marginHorizontal: 30}]}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log(this.props)}>
                  <Icon
                    name="play-skip-forward"
                    size={25}
                    style={styles.iconColorWhite}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    );
  }
}
