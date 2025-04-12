import { Text, View, Button, StyleSheet } from "react-native";
import {useRouter} from "expo-router";
import { LinearGradient } from "expo-linear-gradient";


export default function Index() {
  const router = useRouter();
  function goToCamera(){
    router.push('/camera');
  };
  


  return (
    <LinearGradient
    colors={['rgb(142, 154, 110)','rgb(176, 200, 162)']}
    start={{x:0, y:0}}
    end={{x:1, y:1}}
    style={styles.container}>
      <Text style={styles.mainText}>
        READY TO CHANGE THE WORLD?
      </Text>
      <Button
      onPress={goToCamera}
      title="OPEN CAMERA"
      />
    </LinearGradient>
  );
}


const styles=StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',
    padding: '5%',
  },
  mainText:{
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: 80,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',

  }
})
