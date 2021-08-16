import React, {useState, useEffect} from 'react'
import { View, Text, CardMedia, Image, StyleSheet } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


export default function profiledetails() {

    const [namevar, setName] = useState('');
    const [idvar, setID] = useState('');
    const [urlvar, setImageUrl] = useState('');

    
    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            setName(JSON.parse(jsonValue).name);
            setID(JSON.parse(jsonValue).id);
            setImageUrl(JSON.parse(jsonValue).picture.data.url);
            return jsonValue != null ? console.log(JSON.parse(jsonValue).name) : console.log('empty memory');
        } catch(e) {
            console.log('error in get data' + e);
        }
    }

    useEffect(() => {
        getData();
      },[]);

    return (
        <View style={styles.mainPanel}>
            <View style={styles.mainPanel}>
                <Text style={{textAlign:'left', fontSize:30, fontFamily:'Cochin'}}>Edit Profile</Text>
            </View>
            <View style={styles.imageAndDetailPanel}>
                
                <Avatar size="xlarge" 
                title="BP"
                onPress={() => console.log("Works!")}
                activeOpacity={0.9}
                rounded
                source={{
                    uri:
                    urlvar
                }}
                />
                <View>
                    <View style={styles.textPanelInline}>
                        <Text>
                            UserId: 
                        </Text><Text> {idvar} </Text>
                    </View>
                    <View style={styles.textPanelInline}>
                        <Text>
                            Name:
                        </Text><Text> {namevar} </Text>
                    </View>
                </View>
                
                
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create(
    {
        mainPanel: {
            margin:10,
            padding:10,
        },
        imageAndDetailPanel: {
            alignItems:'center',
            justifyContent:'center'
        },
        textPanelInline:{
            flexDirection:'row',
            justifyContent:'space-between',
            margin:10,
            padding:10,
            borderStyle:'solid',
            borderWidth:3,
            shadowColor:'gray',
            shadowOpacity:1,
        }
    }
)


