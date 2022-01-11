import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const black = '#0D0D0D';
const golden = '#F7933D';
const white = '#fff';
const gray = '#252525';
const grayBlack = 'gray';
const searchbarBackgroundColor = '#252525';

export default StyleSheet.create({
  slidingPanelMain: {
    flex: 1,
    width: '100%',
  },
  dragLine:{
    height:5,
    width:"100%",
    alignItems:'center'
  },
  insideDragLine:{
    width:"20%",
    height:5,
    backgroundColor:white,
  },
  progressBar: {
    height: 5,
    width: '89%',
    backgroundColor: grayBlack,
    borderColor: grayBlack,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  iconColorWhite: {
    color: white,
  },
  iconColorGolden: {
    color: golden,
  },
  iconColorBlack: {
    color: black,
  },
  iconColorGray: {
    color: grayBlack,
  },
  textColorWhite: {
    color: white,
  },
  textColorBlack: {
    color: black,
  },
  textColorGolden: {
    color: golden,
  },
  textColorGray:{
    color:grayBlack,
  },
  textColorGray:{
    color:grayBlack,
  },
  textColorWhiteBold:{
    color:white,
    fontWeight:'bold',
    marginHorizontal:5
  },
  bodyViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLayoutStyle: {
    flex: 1,
    width,
    height: 170,
    alignItems: 'baseline',
    flexDirection: 'row',
    backgroundColor: gray,
    paddingVertical: 12,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    opacity: 0.9,
    zIndex: 2,
  },
  slidingPanelLayoutStyle: {
    flex:1,
    width,
    height,
    backgroundColor: gray,
    justifyContent: 'center',
    opacity: 0.9,
    zIndex: 3,
    top:-70,
  },
  commonTextStyle: {
    width:180,
    color: 'white',
    fontSize: 18,
    fontWeight:'bold'
  },
  headerImage: {
    borderRadius: 100,
    width: 50,
    height: 50,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  iconStyleHeader: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: white,
  },
  centerImageFrameSlidePanel: {
    zIndex: 10,
    width: 350,
    height: 350,
    borderRadius: 200,
    position:'absolute',
  },
  centerImageSlidePanel: {
    top:39,
    left:4,
    width: 250,
    height: 250,
    position: 'relative',
    borderRadius: 100,
    zIndex:10,
  },
  imageSectionPanelLayout:{
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    zIndex: 9,
    bottom:50
  },
  songDetailPanelContainer:{
    flex:3, 
    justifyContent:'center'
  },
  progressBarContainer:{
    width: '100%', 
    height:20,
  },
  progressBarEndTime:{
    color: white,
    right: 20,
    top: 10,
    position: 'absolute',
  },
  progressBarStartTime:{
    color: white,
    left: 20,
    top: 10,
    position: 'absolute',
  },
  songsDetailStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems:'baseline',
    marginHorizontal:20,
    zIndex:20,
    height:80,
  },
  songNameLargeText: {
    fontSize: 25, 
    color: white,
    fontWeight:'bold',
    width:260,
  },
});
