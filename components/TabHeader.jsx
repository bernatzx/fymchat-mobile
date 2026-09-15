import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../styles/global'

const TabHeader = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.appName1}>Fym</Text>
      <Text style={styles.appName2}>Chat</Text>
    </View>
  )
}

export default TabHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 14
  },
  appName1: {
    fontSize: 36,
    fontWeight: 'bold'
  },
  appName2: {
    color: colors.PRIMARY_DARK_GREEN,
    fontWeight: 'bold',
    fontSize: 36
  }
})