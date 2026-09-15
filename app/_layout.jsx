import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const AppStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(tabs)' />
    </Stack>
  )
}

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <AppStack />
    </SafeAreaProvider>
  )
}

export default RootLayout