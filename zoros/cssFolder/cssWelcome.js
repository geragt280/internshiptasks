import { StyleSheet } from "react-native";

const black = '#0D0D0D';
const golden = '#F7933D';

export default StyleSheet.create({
    all: {
        backgroundColor:black,
        flex:1,
    },
    textSmall:{
        fontSize:15,
        color:golden,
    },
    textMedium:{
        fontSize:25,
        color:black,
    },
    textLarge:{
        fontSize:30,
        color:golden,
    },
    headingStyle:{
        margin:20,
        padding:20,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    welcomeButton: {
        width:300,
        height:80,
        marginTop:400,
        borderRadius:100, 
        backgroundColor: golden,
        alignItems: 'center',
        justifyContent: 'center',
        elevation:3,
        
    }
})