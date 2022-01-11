import React, {Component, useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import styles from '../cssFolder/cssSlidingPanel';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import SlidingPanel from 'react-native-sliding-up-down-panels';
// import DataFile from './DataFile';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import imgFrame from '../assits/image_frame.png';
import SoundPlayer from 'react-native-sound-player';
import { useNavigation } from '@react-navigation/native';
import MarqueeText from 'react-native-marquee';
import TrackPlayer from 'react-native-track-player';

// https://github.com/cinder92/react-native-get-music-files

const SliderPanel = forwardRef((props, ref) => {
    const navigation = useNavigation();
    const [playButtonFlag, setplayButtonFlag] = useState('play-circle');
    const [smallPlayButtonFlag, setsmallPlayButtonFlag] = useState('play');
    const [musicPlayStatus, setmusicPlayStatus] = useState(false);
    const [songPlayingStatus, setsongPlayingStatus] = useState(false);
    const [swipeUpDownFlag, setswipeUpDownFlag] = useState(false);
    const [radiusLenght, setradiusLenght] = useState(0);
    const [headerDisplayStatus, setheaderDisplayStatus] = useState('flex');
    const [panelLayoutDisplayStatus, setpanelLayoutDisplayStatus] = useState("none");
    const [songSelectedFlag, setsongSelectedFlag] = useState(false);
    const [panelHeaderHeight, setpanelHeaderHeight] = useState(160);
    const [songname, setsongname] = useState("");
    const [singername, setsingername] = useState("");
    const [price, setprice] = useState("");
    const [picuri, setpicuri] = useState("https://w7.pngwing.com/pngs/784/399/png-transparent-computer-software-windows-nt-windows-xp-unknown-person-face-monochrome-computer-wallpaper.png");
    const [panelHeight, setpanelHeight] = useState(0);
    var Track;

    useEffect(() => {
        console.log("panel got rerender.");
        ClosePlayer();
    }, []);

    useImperativeHandle(ref, () => ({
        updatingFunction(name,singer,price,uri,songPath,songType){
            // console.log("component loaded slider.",name, price);
            if (musicPlayStatus && songname != name) {
                stopMusic();
            }
            setsongname(name);
            setsingername(singer);
            setprice(price);
            setpicuri(uri);   
            
            OpenPlayer();
            console.log("song path:", songPath);
            var millisecondsToWait = 500;
            const timer = setTimeout(() => {
                console.log('Timeout called!');
                playandpause(songPath,songType);
            }, millisecondsToWait);
            // return () => clearTimeout(timer);
        }
    
    }));

    function stopMusic(){
        console.log('song stopped.')
        // SoundPlayer.stop();
        TrackPlayer.stop();
        setmusicPlayStatus(false);
        setsongPlayingStatus(false);
        setplayButtonFlag('play-circle');
        setsmallPlayButtonFlag('play');
    }

    function MusicPause(){
        TrackPlayer.pause();
        console.log('pause music');           
        setplayButtonFlag('play-circle');
        setsmallPlayButtonFlag('play');
        setsongPlayingStatus(false);
    }

    function MusicPlay(){
        TrackPlayer.play();
        console.log('play music');           
        setplayButtonFlag('pause-circle');
        setsmallPlayButtonFlag('pause');
        setsongPlayingStatus(true);
    }

    const playandpause = (musicpath, type) => {
        try {
            // play the file tone.mp3
            if (!musicPlayStatus) {
            //   SoundPlayer.playUrl(musicpath);
              console.log('start music');
              setplayButtonFlag('pause-circle');
              setsmallPlayButtonFlag('pause');
              setmusicPlayStatus(true);
              setsongPlayingStatus(true);
            } else if (musicPlayStatus && songPlayingStatus) {
            //   SoundPlayer.pause();
                MusicPause();
            }
            else if (musicPlayStatus && !songPlayingStatus) {
                // SoundPlayer.play();
                MusicPlay();
            }
          } catch (e) {
            console.log(`cannot play the sound file`, e);
          }
    }

    const OpenPlayer = () => {
            setpanelHeaderHeight(160);
            setheaderDisplayStatus('flex');     
    }

    const ClosePlayer = () => {
        if (!songSelectedFlag) {
            setpanelHeaderHeight(100);
            setheaderDisplayStatus('none');
            stopMusic();
          }
    }

    function panelChangesWhenOpen(){
        // setpanelPosition('bottom');
        navigation.setOptions({
            tabBarVisible: true,
        });
        setradiusLenght(0);
        setswipeUpDownFlag(false);
        setheaderDisplayStatus('flex');
        setpanelLayoutDisplayStatus('none');
    }
    
    function panelChangesWhenClose(){
        navigation.setOptions({
            tabBarVisible: false,
        });
        setradiusLenght(50);
        setswipeUpDownFlag(true);
        setheaderDisplayStatus('none');
        setpanelLayoutDisplayStatus('flex');
    }

    const animationStart = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        // console.log("Panel height when animation start is:", panelHeight);
        //const {navigation} = this.props;
        if (!swipeUpDownFlag && panelHeight < 20) {
            panelChangesWhenClose();
        } else if (swipeUpDownFlag && panelHeight < 20) {
            panelChangesWhenOpen();
        }
    }

    const getPanelHeight = (height) => {
        setpanelHeight(height);
    }

    function checkCurrentPanelLenght(){
        if (panelHeight > 250) {
            if (!swipeUpDownFlag) {
                console.log('panel closed.')
                panelChangesWhenClose();
            }
        }
        else if(panelHeight < 250){
            if(swipeUpDownFlag){
                console.log('panel open.')
                panelChangesWhenOpen();
            }
        }
        console.log("Panel:",panelHeight);
    }

    function animationStop(){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        // console.log("panel height when animation stop is:", panelHeight);
        if (panelHeight > 1) {
            // console.log('panel open.');
            panelChangesWhenClose();            
        }
        else{
            // console.log('panel closed.');
            panelChangesWhenOpen();
        }
    }

    return (
        <View>
            <SlidingPanel
                AnimationSpeed={700}
                allowDragging={true}
                headerLayoutHeight={panelHeaderHeight}
                onAnimationStart={() =>{
                    // console.log("animation start."); 
                    animationStart(); 
                }}
                // onDragStart={() => checkCurrentPanelLenght()}
                onDragStop={() => {
                    // console.log("drag stop.");
                    checkCurrentPanelLenght();
                }}
                onAnimationStop={() => { 
                    // console.log('animation stop.');
                    animationStop();
                }}
                getHeightFunction={getPanelHeight}
                headerLayout={() => (
                <View
                    style={[
                    styles.headerLayoutStyle,
                    {
                        borderTopStartRadius: radiusLenght,
                        borderTopRightRadius: radiusLenght,
                    },
                    ]}>
                        <View style={[styles.dragLine, {display: (headerDisplayStatus == 'flex') ? 'none' : 'flex'}]}><View style={styles.insideDragLine}></View></View>
                    <View
                    style={[
                        styles.flexDirectionRow,
                        {display: headerDisplayStatus},
                    ]}>
                    {/* <View style={[styles.flexDirectionRow]}> */}
                    <View>
                        <Image
                        source={ {uri: picuri} }
                        style={styles.headerImage}
                        />
                    </View>
                    <View style={{paddingHorizontal: 10}}>
                        <MarqueeText
                        style={styles.commonTextStyle}
                        duration={10000}
                        marqueeOnStart
                        loop
                        marqueeDelay={2000}
                        marqueeResetDelay={2000}
                        >
                            {songname}
                        </MarqueeText>
                        <View style={[styles.flexDirectionRow, {width:140}]}>
                            <MarqueeText
                            style={styles.textColorGray}
                            duration={5000}
                            marqueeOnStart
                            loop
                            marqueeDelay={1000}
                            marqueeResetDelay={2000}
                            >
                                {singername}
                            </MarqueeText>
                        <Text style={[styles.textColorWhite]}>
                            {' '}
                            ${price}
                        </Text>
                        </View>
                    </View>
                    </View>
                    <View
                    style={[
                        styles.flexDirectionRow,
                        {display: headerDisplayStatus},
                    ]}>
                    <TouchableOpacity>
                        <Icon
                        name={smallPlayButtonFlag}
                        size={30}
                        style={styles.iconStyleHeader}
                        onPress={() => playandpause()}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon
                        name="close-outline"
                        size={30}
                        style={styles.iconStyleHeader}
                        onPress={() => ClosePlayer()}
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
                        {display: panelLayoutDisplayStatus},
                    ]}>
                    <Image
                        source={imgFrame}
                        style={styles.centerImageFrameSlidePanel}
                    />
                    <Image
                        source={{uri: picuri }}
                        style={styles.centerImageSlidePanel}
                    />
                    </View>
                    <View
                    style={[
                        styles.songDetailPanelContainer,
                        {display: panelLayoutDisplayStatus},
                    ]}>
                    <View style={styles.songsDetailStyle}>
                        <View>
                            <MarqueeText
                            style={styles.songNameLargeText}
                            duration={15000}
                            marqueeOnStart
                            loop
                            marqueeDelay={1000}
                            marqueeResetDelay={2000}
                            >
                                {songname}
                            </MarqueeText>
                        <View style={[styles.flexDirectionRow,{width:240}]}>
                            <MarqueeText
                            style={styles.textColorGray}
                            duration={15000}
                            marqueeOnStart
                            loop
                            marqueeDelay={1000}
                            marqueeResetDelay={2000}
                            >
                                {singername}
                            </MarqueeText>
                            <Text style={styles.textColorWhiteBold}>
                            ${price}
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
                        <TouchableOpacity onPress={() => playandpause()}>
                        <Icon
                            name={playButtonFlag}
                            size={60}
                            style={[styles.iconColorWhite, {marginHorizontal: 30}]}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log('props')}>
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
        </View>
    );
});  

export default SliderPanel;
