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
} from 'react-native';
const {width, height} = Dimensions.get('window');
import SlidingPanel from 'react-native-sliding-up-down-panels';
import itemArr from './DataFile';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import imgFrame from '../assits/image_frame.png';
import SoundPlayer from 'react-native-sound-player';
import { useNavigation } from '@react-navigation/native';

// https://github.com/cinder92/react-native-get-music-files

const SliderPanel = forwardRef((props, ref) => {
    const navigation = useNavigation();
    const [playButtonFlag, setplayButtonFlag] = useState('play-circle');
    const [smallPlayButtonFlag, setsmallPlayButtonFlag] = useState('play');
    const [musicPlayStatus, setmusicPlayStatus] = useState(false);
    const [swipeUpDownFlag, setswipeUpDownFlag] = useState(false);
    const [radiusLenght, setradiusLenght] = useState(0);
    const [headerDisplayStatus, setheaderDisplayStatus] = useState('flex');
    const [panelLayoutDisplayStatus, setpanelLayoutDisplayStatus] = useState("none");
    const [songSelectedFlag, setsongSelectedFlag] = useState(false);
    const [panelHeaderHeight, setpanelHeaderHeight] = useState(160);
    const [songname, setsongname] = useState(itemArr[0].name);
    const [singername, setsingername] = useState(itemArr[0].singer);
    const [price, setprice] = useState(itemArr[0].price);
    const [picuri, setpicuri] = useState(itemArr[0].uri);
    var panelHeight;

    useEffect(() => {
        console.log("panel got rerender.");
    }, [])

    // const updatingFunction = () =>{
    //     console.log("component loaded slider.",props.songname, props.singername);
    //     setsongname(props.songname);
    //     setsingername(props.singername);
    //     setprice(props.pricedetails);
    //     setpicuri(props.songUriDetails);
        
    // }

    useImperativeHandle(ref, () => ({
        updatingFunction(name,singer,price,uri){
            // console.log("component loaded slider.",name, price);
            setsongname(name);
            setsingername(singer);
            setprice(price);
            setpicuri(uri);   
            
            OpenPlayer();
        }
    
    }));


    const playandpause = () => {
        try {
            // play the file tone.mp3
            if (!musicPlayStatus) {
              SoundPlayer.playSoundFile('balam_pichkari', 'mp3');
              console.log('me chala');
              //setplayButtonFlag('pause');
              setplayButtonFlag('pause-circle');
              setsmallPlayButtonFlag('pause');
              setmusicPlayStatus(true);
            } else if (musicPlayStatus) {
              SoundPlayer.pause();
              console.log('me bhi chala');           
              setplayButtonFlag('play-circle');
              setsmallPlayButtonFlag('play');
              setmusicPlayStatus(false);
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
          }
    }

    function panelChangesWhenOpen(){
        setradiusLenght(0);
        setswipeUpDownFlag(false);
        setheaderDisplayStatus('flex');
        setpanelLayoutDisplayStatus('none');
        // setpanelPosition('bottom');
        navigation.setOptions({
            tabBarVisible: true,
        });
    }

    function panelChangesWhenClose(){
        setradiusLenght(50);
        setswipeUpDownFlag(true);
        setheaderDisplayStatus('none');
        setpanelLayoutDisplayStatus('flex');
        navigation.setOptions({
            tabBarVisible: false,
        });
    }

    const animationStart = () => {
        console.log("Panel Lenght:", panelHeight);
        //const {navigation} = this.props;
        if (!swipeUpDownFlag) {
            panelChangesWhenClose();
        } else if (swipeUpDownFlag) {
            panelChangesWhenOpen();
        }
    }

    const getPanelHeight = (height) => {
        panelHeight = height;
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
        console.log("panel length outside:",panelHeight);
    }

    return (
        <View>
            <SlidingPanel
                AnimationSpeed={500}
                allowDragging={true}
                headerLayoutHeight={panelHeaderHeight}
                onAnimationStart={() => animationStart()}
                onDragStart={() => checkCurrentPanelLenght()}
                onDragStop={() => checkCurrentPanelLenght()}
                onAnimationStop={() => checkCurrentPanelLenght()}
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
                        <Text style={styles.commonTextStyle}>
                        {songname}
                        </Text>
                        <View style={styles.flexDirectionRow}>
                        <Text style={styles.textColorGray}>
                            {singername}
                        </Text>
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
                        <Text style={styles.songNameLargeText}>
                            {songname}
                        </Text>
                        <View style={styles.flexDirectionRow}>
                            <Text style={styles.textColorGray}>
                            {singername}
                            </Text>
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
