import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Tabs } from 'expo-router'
import { TabBar } from '../../components/TabBar'
import TabHeader from '../../components/TabHeader'

const TabsLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabHeader />
      <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
        <Tabs.Screen name='grammar' options={{ title: 'Grammar' }} />
        <Tabs.Screen name='translator' options={{ title: 'Translator' }} />
        <Tabs.Screen name='paraphraser' options={{ title: 'Paraphraser' }} />
      </Tabs>
    </SafeAreaView>
  )
}

export default TabsLayout