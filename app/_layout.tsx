import { Stack } from "expo-router";
import { useNavigation } from '@react-navigation/native'; // Required for header config


export default function RootLayout() {
  
  return <Stack screenOptions={{
    headerShown: false,  // ✅ Hides the header globally
  }} />;
}
