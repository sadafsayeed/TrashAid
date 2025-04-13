import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useFonts } from "expo-font";
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
} from "@expo-google-fonts/jetbrains-mono";

export default function Dashboard() {
  const { classification } = useLocalSearchParams<{ classification: string }>();
  const parts = classification.split(",");

  const [fontsLoaded] = useFonts({
    JetBrainsMono: JetBrainsMono_400Regular,
    "JetBrainsMono-Bold": JetBrainsMono_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <FontAwesome6 name="recycle" size={100} color="green" />
        <Text style={styles.title}>Thank you!</Text>
        <Text style={styles.subtitle}>You gave a {parts[0]}</Text>
        <View style={styles.recyclableContainer}>
          <Text style={styles.description}>This is {parts[1]}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFCF3",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "JetBrainsMono-Bold",
    color: "#333333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "JetBrainsMono",
    color: "#666666",
    textAlign: "center",
  },
  recyclableContainer: {
    backgroundColor: "#effadf",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#d9e9c9",
  },
  description: {
    fontSize: 20,
    fontFamily: "JetBrainsMono",
    color: "#888888",
    textAlign: "center",
  },
});




// import {View, Text, StyleSheet, Image} from "react-native";
// import {LinearGradient} from 'expo-linear-gradient';
// import { useLocalSearchParams } from "expo-router";
// export default function Dashboard(){
//     const {classification} = useLocalSearchParams<{classification:string}>();
//     const parts = classification.split(',');
//     const img = require('@/assets/images/cute_animals.jpg');
//     return(
//         <View style = {styles.container}>
//             <Text style = {styles.text}>
//                 Thank you!
//             </Text>
//             <Text style = {styles.text2}>You gave {parts[0]}.</Text>
//             <Text style = {styles.text3}>This is{parts[1]}</Text>
//             <Image source={img} style={styles.image}/>
//         </View>
//     )
// }


// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         backgroundColor: 'rgba(237, 181, 140,1)',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     text:{
//         position: 'absolute',
//         top: 50,
//         textAlign: 'center',
//         color: 'rgba(0,0,0,1)',
//         fontWeight: 'bold',
//         fontSize: 50,
//     },
//     text2:{
//         position: 'absolute',
//         top: 150,
//         textAlign: 'center',
//         color: 'rgba(0,0,0,1)',
//         fontWeight: 'bold',
//         fontSize: 50,
//     },
//     text3:{
//         position: 'absolute',
//         top: 300,
//         textAlign: 'center',
//         color: 'rgba(0,0,0,1)',
//         fontWeight: 'bold',
//         fontSize: 50,
//     },
//     image:{
//         position: 'absolute',
//         bottom: 0,
//         left:0,
//         right:0,
//         width: '100%',
//         height: 400,
//         resizeMode: 'cover'
//     },

// })