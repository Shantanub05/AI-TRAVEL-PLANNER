import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { AuthProvider } from "@/configs/AuthContext";
import 'react-native-get-random-values';
import { CreateTripContext } from "@/context/CreateTripContext";
import { useState } from "react";


const RootLayout = () => {
  useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  })

  const [tripData, setTripData] = useState<any>([])
  return (

    <AuthProvider>
      <CreateTripContext.Provider value={{ tripData, setTripData }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
        </Stack>
      </CreateTripContext.Provider>
    </AuthProvider>
  )
}

export default RootLayout;
