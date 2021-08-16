import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";

const black = '#0D0D0D';
const golden = '#F7933D';
const check = '#3b5998';

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
        fontSize:30,
        width:350,
        borderRadius:100,
        padding:30,
        height:90,
        margin:5
    },
    middleContainer:{
        marginTop:50,
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
        width:75,
        height:75,
        alignItems:'center',
        justifyContent:'center',
        margin:0,
        padding:10,
        borderRadius:50, 
        backgroundColor: golden,
        elevation:3,
    },
    facebookButtonText:{
        color:'#fff',
        fontWeight:'bold', 
        margin:0,
        fontSize:15,
        elevation:3,
        borderRadius:20
    },
    facebookButton:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:golden,
        flexDirection:'row',
        padding:10,
        marginTop:10,
        marginBottom:50,
        borderRadius:20
    }
})