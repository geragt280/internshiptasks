import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";

const black = '#0D0D0D';
const golden = '#F7933D';
const check = '#3b5998';
const facebookBlue = '#166FE5'

export default StyleSheet.create({
    all: {
        backgroundColor:black,
        flex:1,
        alignItems:'center'
    },
    textSmall:{
        fontSize:15,
        color:golden,
        fontWeight:'bold'
    },
    textMedium:{
        fontSize:25,
        color:black,
        fontWeight:'bold'
    },
    textLarge:{
        fontSize:50,
        color:golden,
        fontWeight:'bold'
    },
    header:{
        margin:20,
        alignItems:'center',
        justifyContent:'center', 
    },
    textInput:{
        backgroundColor:golden,
        color:black,
        fontSize:20,
        width:270,
        borderRadius:10,
        paddingHorizontal:25,
        height:60,
        margin:5
    },
    middleContainer:{
        marginTop:100,
        padding:20,
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        flex:1,
    },
    buttonLoginText:{
        fontSize:37,
        color:black,
        fontWeight:'bold'
    },
    loginButton: {
        width:50,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        borderRadius:50, 
        backgroundColor: golden,
    },
    facebookButtonText:{
        color:'#fff',
        fontWeight:'bold', 
        backgroundColor: 'rgba(52, 52, 52, 0)',
        marginHorizontal:0,
        fontSize:15,
        elevation:10,
        borderRadius:20
    },
    facebookButton:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:facebookBlue,
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:5,
        marginTop:10,
        marginBottom:50,
        borderRadius:10
    }
})