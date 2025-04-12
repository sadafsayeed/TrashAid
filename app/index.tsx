import { Text, View, Button } from "react-native";
import {useRouter} from "expo-router";


export default function Index() {
  const router = useRouter();
  function goToCamera(){
    router.push('/camera');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Open Camera</Text>
      <Button
      onPress={goToCamera}
      title="PRESS ME!"
      />
    </View>
  );
}
