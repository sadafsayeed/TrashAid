import {View, Text, StyleSheet, Image} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import { useLocalSearchParams } from "expo-router";
export default function Dashboard(){
    const {classification} = useLocalSearchParams<{classification:string}>();
    const parts = classification.split(',');
    const img = require('@/assets/images/cute_animals.jpg');
    return(
        <View style = {styles.container}>
            <Text style = {styles.text}>
                Thank you!
            </Text>
            <Text style = {styles.text2}>You gave {parts[0]}.</Text>
            <Text style = {styles.text3}>This is{parts[1]}</Text>
            <Image source={img} style={styles.image}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgba(237, 181, 140,1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        position: 'absolute',
        top: 50,
        textAlign: 'center',
        color: 'rgba(0,0,0,1)',
        fontWeight: 'bold',
        fontSize: 50,
    },
    text2:{
        position: 'absolute',
        top: 150,
        textAlign: 'center',
        color: 'rgba(0,0,0,1)',
        fontWeight: 'bold',
        fontSize: 50,
    },
    text3:{
        position: 'absolute',
        top: 300,
        textAlign: 'center',
        color: 'rgba(0,0,0,1)',
        fontWeight: 'bold',
        fontSize: 50,
    },
    image:{
        position: 'absolute',
        bottom: 0,
        left:0,
        right:0,
        width: '100%',
        height: 400,
        resizeMode: 'cover'
    },

})