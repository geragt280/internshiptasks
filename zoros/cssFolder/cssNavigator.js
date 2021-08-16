import {StyleSheet, Dimensions} from 'react-native';
import {color} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const black = '#0D0D0D';
const golden = '#F7933D';
const white = '#fff';
const searchbarBackgroundColor = '#252525';
const gray = 'gray';
const dimensionWidth = width;

export default StyleSheet.create({
  iconAligner: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 5,
    alignSelf: 'stretch',
    alignItems:'center',
    justifyContent: 'space-between',
  },
  nestedIconAligner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: black,
  },
  sellerTypeStyle:{
    marginHorizontal: 5,
    color: golden,
    borderColor: golden,
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    textAlign: 'center',
    width: 100,
    textTransform: 'uppercase',
  },
  profilePopularityDetailsNameText:{
    fontSize:12,
    fontWeight:'bold',
    color:gray,
  },
  profilePopularityDetailsInformationText:{
    fontSize:18,
    fontWeight:'bold',
    color:white,
  },
  profileSetting:{
    flexDirection:'row'
  },
  pofileDetailsSections:{
    alignContent: 'center',
    paddingHorizontal: 0,
    top: 0,
    flexDirection:'row',
  },
  profileImageStyle:{
    backgroundColor: 'black',
    width: 130,
    height: 130,
    marginTop: 0,
    borderRadius:100,
    marginHorizontal:15,
    padding:10
  },
  box: {
    backgroundColor: black,
    alignItems:'center',
    position: 'relative', 
  },
  profileButtonPortion:{
    alignItems:'center',
    position:'relative',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal:10,
  },
  subscribeButton:{
    paddingVertical:14,
    paddingHorizontal:"13.5%",
    margin:10,
    backgroundColor:golden,
    borderColor:golden,
    borderRadius:15,
  },
  subscribeButtonText:{
    fontSize:15,
    fontWeight:'bold'
  },
  startChatButton:{
    paddingVertical:14,
    paddingHorizontal:"13.5%",
    margin:10,
    backgroundColor:black,
    borderRadius:15,
    borderColor:white,
    borderWidth:1
  },
  startChatButtonText:{
    fontSize:15,
    fontWeight:'bold',
    color:white
  },
  textSmall: {
    fontSize: 15,
    color: golden,
    fontWeight: 'bold',
  },
  textMedium: {
    fontSize: 30,
    color: white,
    fontWeight: 'bold',
    width: 300,
  },
  textLarge: {
    fontSize: 50,
    color: golden,
    fontWeight: 'bold',
  },
  profileNameText:{
    fontSize: 15,
    color: white,
    fontWeight: 'bold',
  },
  textOnImage: {
    position: 'relative',
    top: -90,
    fontSize: 20,
    fontWeight: 'bold',
    color: white,
    backgroundColor:golden,
    padding:2,
    borderRadius:10,
    opacity:.7
  },
  iconColorWhite: {
    color: '#fff',
  },
  iconColorGolden: {
    color: golden,
  },
  iconColorBlack: {
    color: black,
  },
  iconColorGray: {
    color: gray,
  },
  ////error here
  tabviewContainer: {
    position: 'relative',
    height:(height/1.8),
    width:dimensionWidth,
    padding:10
  },
  tabviewSinglePage: {
    backgroundColor: black,
    borderWidth: 1,
    borderTopColor: gray,
  },
  tabBarIndicatorColor: {
    borderBottomWidth: 4,
    borderBottomColor: golden,
  },
  tabBarBackgroundColor: {
    backgroundColor: black,
  },
  tabBarLabelStyle: {
    color: gray,
    margin: 0,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
