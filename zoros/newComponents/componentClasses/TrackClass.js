import React from "react";
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
    PermissionsAndroid,
    NativeAppEventEmitter
} from 'react-native';
import TrackPlayer, { Capability } from 'react-native-track-player';


export default class TrackClass{

    tracksNameArray = [];

    constructor(tracks){
        
    // TrackPlayer.registerPlaybackService(() => require("./TrackServiceClass"));  
        var tempArray = [];
        for(const file of tracks){
          var track = {
            url: file.songPath, // Load media from the network
            title: file.name,
            artist: file.singer,
            album: file.title,
            genre: file.comment,
            // date: '2014-05-20T07:00:00+00:00', // RFC 3339
            artwork: (file.thumb) ? file.thumb : file.uri, // Load artwork from the network
            duration: file.duration // Duration in seconds
          }
          tempArray.push(track);
        }
        TrackPlayer.add(tempArray);
        // this.Collect_all(tempArray);

        
    }

    async Collect_all() {
        const tracks = await TrackPlayer.getQueue();
        for (let i = 0; i < tracks.length; i++) {
            this.tracksNameArray.push(tracks[i].title);
        }
        TrackPlayer.updateOptions({
            // Media controls capabilities
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
            ],
        });
    }

    async playSong(trackName){
        const songIndex = this.tracksNameArray.indexOf(trackName);
        await TrackPlayer.skip(songIndex);
        await TrackPlayer.play();
    }


}