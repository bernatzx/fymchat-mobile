import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const AppStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(tabs)' />
    </Stack>
  )
}

const RootLayout = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function doAsyncStuff() {
      try {
        await new Promise(resolve => setTimeout(resolve, 5000))
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    doAsyncStuff();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <AppStack />
    </SafeAreaProvider>
  )
}

export default RootLayout