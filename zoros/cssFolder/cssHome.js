import {StyleSheet, Dimensions } from 'react-native';
import {color} from 'react-native-reanimated';

const black = '#0D0D0D';
const golden = '#F7933D';
const white = '#fff';
const width= '100%';
const gray = 'gray';
const searchbarBackgroundColor = '#252525';
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  all: {
    backgroundColor: black,
    flex: 1,
  },
  barStyle: {
    backgroundColor: black
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  scrollView: {
    flexGrow: 1,
  },
  cartIconBadgeStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontWeight:'bold',
    borderColor:golden,
    backgroundColor: '#F7933D',
    borderRadius: 50,
  },
  renderedItemImageStyling: {
    backgroundColor: 'transparent',
    borderRadius: 100,
    opacity: 0.5,
    zIndex: 1,
  },
  iconAligner: {
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    position: 'relative',
    justifyContent: 'space-between',
  },
  nestedIconAligner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: black,
    alignSelf: 'stretch',
    position: 'relative',
  },
  buttonText: {
    color: white,
    fontWeight: 'bold',
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
  renderedItemTextOnImage: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    color: white,
    padding: 2,
    borderRadius: 10,
    textAlign:"center",
    width:150,
    height:30,
    opacity: 1,
    zIndex: 10,
  },
  renderedSingleItemCommercialPageItem: {
    marginVertical: 8,
    marginHorizontal: 5,
    paddingHorizontal:4,
    alignItems: 'center',
    // width: '100%',
    justifyContent: 'center',
  },
  searchTextContainer: {
    margin: 20,
  },
  searchContainer: {
    position: 'relative',
    margin: 10,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignContent: 'center',
    padding: 5,
    backgroundColor: searchbarBackgroundColor,
    color: '#fff',
    borderRadius: 20,
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
  tabviewContainer: {
    position: 'relative',
    alignSelf: 'stretch',
    textAlign:'center',
    marginHorizontal: 10,
    flex:1
    // top: 30,
    // height:windowHeight,
    // marginBottom:80,
  },
  tabviewSinglePage: {
    flex: 1,
    borderWidth: 1,
    borderTopColor: 'gray',
    width: '100%',
  },
  tabBarIndicatorColor: {
    borderBottomWidth: 4,
    borderBottomColor: golden,
  },
  tabBarBackgroundColor: {
    backgroundColor: black,
  },
  tabBarLabelStyle: {
    color: white,
    margin: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  slidingPanelMain: {
    zIndex:1,
  },
  
});
